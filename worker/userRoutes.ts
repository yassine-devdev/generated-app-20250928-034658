import { Hono } from "hono";
import { getAgentByName } from 'agents';
import { ChatAgent } from './agent';
import { API_RESPONSES } from './config';
import { Env, getAppController } from "./core-utils";
import { getDbClient } from "./db";
import { count, eq, and, isNull, inArray, gt, desc, avg } from "drizzle-orm";
import { users, schools, schoolMembers, courses, assignments, submissions, enrollments, userRoleEnum, knowledgeBaseArticles } from "../db/schema";
import { authMiddleware, signJwt, verifyPassword, AuthenticatedContext, schoolAdminMiddleware } from "./auth";
import { insertIntoVectorize, deleteFromVectorize } from './vectorize';
type HonoEnv = {
    Bindings: Env;
    Variables: {
        user: Omit<typeof users.$inferSelect, 'hashedPassword'>;
    };
};
/**
 * DO NOT MODIFY THIS FUNCTION. Only for your reference.
 */
export function coreRoutes(app: Hono<{ Bindings: Env }>) {
    // Use this API for conversations. **DO NOT MODIFY**
    app.all('/api/chat/:sessionId/*', async (c) => {
        try {
        const sessionId = c.req.param('sessionId');
        const agent = await getAgentByName<Env, ChatAgent>(c.env.CHAT_AGENT, sessionId); // Get existing agent or create a new one if it doesn't exist, with sessionId as the name
        const url = new URL(c.req.url);
        url.pathname = url.pathname.replace(`/api/chat/${sessionId}`, '');
        return agent.fetch(new Request(url.toString(), {
            method: c.req.method,
            headers: c.req.header(),
            body: c.req.method === 'GET' || c.req.method === 'DELETE' ? undefined : c.req.raw.body
        }));
        } catch (error) {
        console.error('Agent routing error:', error);
        return c.json({
            success: false,
            error: API_RESPONSES.AGENT_ROUTING_FAILED
        }, { status: 500 });
        }
    });
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    // --- AUTH ROUTES ---
    app.post('/api/auth/login', async (c) => {
        try {
            const body = await c.req.json().catch(() => null);
            if (!body) {
                return c.json({ success: false, error: 'Invalid request body. Please provide a valid JSON.' }, 400);
            }
            const { email, password } = body;
            if (!email || !password) {
                return c.json({ success: false, error: 'Email and password are required' }, 400);
            }
            const db = getDbClient(c.env);
            const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
            if (!user || !user.hashedPassword) {
                return c.json({ success: false, error: 'Invalid credentials' }, 401);
            }
            const isPasswordValid = await verifyPassword(password, user.hashedPassword);
            if (!isPasswordValid) {
                return c.json({ success: false, error: 'Invalid credentials' }, 401);
            }
            const { hashedPassword, ...userWithoutPassword } = user;
            const token = await signJwt({ id: user.id, role: user.role });
            return c.json({ success: true, data: { token, user: userWithoutPassword } });
        } catch (error) {
            console.error('Login error:', error);
            return c.json({ success: false, error: 'An internal server error occurred during login.' }, 500);
        }
    });
    app.get('/api/me', authMiddleware, async (c: AuthenticatedContext) => {
        const user = c.get('user');
        return c.json({ success: true, data: { user } });
    });
    // --- OWNER ROUTES ---
    const ownerApi = new Hono<HonoEnv>();
    ownerApi.use('*', authMiddleware, (c, next) => {
        const user = c.get('user');
        if (user.role !== 'owner') return c.json({ success: false, error: 'Forbidden' }, 403);
        return next();
    });
    ownerApi.get('/stats', async (c) => {
        try {
            const db = getDbClient(c.env);
            const [userStats] = await db.select({ value: count() }).from(users);
            const [schoolStats] = await db.select({ value: count() }).from(schools);
            return c.json({ success: true, data: { totalUsers: userStats.value, totalSchools: schoolStats.value, revenue: 98450, newSubscriptions: 573 } });
        } catch (error) {
            console.error('Failed to get owner stats:', error);
            return c.json({ success: false, error: 'Failed to retrieve owner stats' }, 500);
        }
    });
    ownerApi.get('/schools', async (c) => {
        const user = c.get('user');
        try {
            const db = getDbClient(c.env);
            const ownerSchools = await db.select().from(schools).where(eq(schools.ownerId, user.id));
            return c.json({ success: true, data: ownerSchools });
        } catch (error) {
            console.error('Failed to get schools:', error);
            return c.json({ success: false, error: 'Failed to retrieve schools' }, 500);
        }
    });
    ownerApi.get('/schools/:schoolId/users', async (c) => {
        const schoolId = c.req.param('schoolId');
        const role = c.req.query('role') as (typeof userRoleEnum.enumValues)[number];
        if (!role || !userRoleEnum.enumValues.includes(role)) {
            return c.json({ success: false, error: 'Valid role query parameter is required' }, 400);
        }
        try {
            const db = getDbClient(c.env);
            const schoolUsers = await db.select({ user: users }).from(users)
                .innerJoin(schoolMembers, eq(users.id, schoolMembers.userId))
                .where(and(eq(schoolMembers.schoolId, schoolId), eq(schoolMembers.role, role)));
            return c.json({ success: true, data: schoolUsers.map(u => u.user) });
        } catch (error) {
            console.error('Failed to get school users:', error);
            return c.json({ success: false, error: 'Failed to retrieve school users' }, 500);
        }
    });
    ownerApi.post('/users', async (c) => {
        const { email, firstName, lastName, role, schoolId } = await c.req.json();
        if (!email || !firstName || !lastName || !role || !schoolId) {
            return c.json({ success: false, error: 'Missing required fields' }, 400);
        }
        try {
            const db = getDbClient(c.env);
            const [newUser] = await db.insert(users).values({ email, firstName, lastName, role, hashedPassword: MOCK_PASSWORD_HASH }).returning();
            await db.insert(schoolMembers).values({ userId: newUser.id, schoolId, role });
            return c.json({ success: true, data: newUser }, 201);
        } catch (error) {
            console.error('Failed to create user:', error);
            return c.json({ success: false, error: 'Failed to create user' }, 500);
        }
    });
    ownerApi.put('/users/:userId', async (c) => {
        const userId = c.req.param('userId');
        const { email, firstName, lastName } = await c.req.json();
        try {
            const db = getDbClient(c.env);
            const [updatedUser] = await db.update(users).set({ email, firstName, lastName, updatedAt: new Date() }).where(eq(users.id, userId)).returning();
            return c.json({ success: true, data: updatedUser });
        } catch (error) {
            console.error('Failed to update user:', error);
            return c.json({ success: false, error: 'Failed to update user' }, 500);
        }
    });
    ownerApi.delete('/users/:userId', async (c) => {
        const userId = c.req.param('userId');
        try {
            const db = getDbClient(c.env);
            await db.delete(users).where(eq(users.id, userId));
            return c.json({ success: true, data: { id: userId } });
        } catch (error) {
            console.error('Failed to delete user:', error);
            return c.json({ success: false, error: 'Failed to delete user' }, 500);
        }
    });
    // Knowledge Base CRUD for Owner
    ownerApi.get('/kb', async (c) => {
        try {
            const db = getDbClient(c.env);
            const articles = await db.select().from(knowledgeBaseArticles).orderBy(desc(knowledgeBaseArticles.updatedAt));
            return c.json({ success: true, data: articles });
        } catch (error) {
            console.error('Failed to get KB articles:', error);
            return c.json({ success: false, error: 'Failed to retrieve articles' }, 500);
        }
    });
    ownerApi.post('/kb', async (c) => {
        const { title, content } = await c.req.json();
        if (!title || !content) return c.json({ success: false, error: 'Title and content are required' }, 400);
        try {
            const db = getDbClient(c.env);
            const [newArticle] = await db.insert(knowledgeBaseArticles).values({ title, content }).returning();
            await insertIntoVectorize(newArticle.id, `${newArticle.title}\n${newArticle.content}`, c.env);
            return c.json({ success: true, data: newArticle }, 201);
        } catch (error) {
            console.error('Failed to create KB article:', error);
            return c.json({ success: false, error: 'Failed to create article' }, 500);
        }
    });
    ownerApi.put('/kb/:id', async (c) => {
        const id = c.req.param('id');
        const { title, content } = await c.req.json();
        if (!title || !content) return c.json({ success: false, error: 'Title and content are required' }, 400);
        try {
            const db = getDbClient(c.env);
            const [updatedArticle] = await db.update(knowledgeBaseArticles).set({ title, content, updatedAt: new Date() }).where(eq(knowledgeBaseArticles.id, id)).returning();
            await insertIntoVectorize(updatedArticle.id, `${updatedArticle.title}\n${updatedArticle.content}`, c.env);
            return c.json({ success: true, data: updatedArticle });
        } catch (error) {
            console.error('Failed to update KB article:', error);
            return c.json({ success: false, error: 'Failed to update article' }, 500);
        }
    });
    ownerApi.delete('/kb/:id', async (c) => {
        const id = c.req.param('id');
        try {
            const db = getDbClient(c.env);
            await db.delete(knowledgeBaseArticles).where(eq(knowledgeBaseArticles.id, id));
            await deleteFromVectorize(id, c.env);
            return c.json({ success: true, data: { id } });
        } catch (error) {
            console.error('Failed to delete KB article:', error);
            return c.json({ success: false, error: 'Failed to delete article' }, 500);
        }
    });
    app.route('/api/owner', ownerApi);
    // --- SCHOOL ADMIN ROUTES ---
    const adminApi = new Hono<HonoEnv>();
    adminApi.use('/schools/:schoolId/*', authMiddleware, schoolAdminMiddleware);
    adminApi.get('/schools/:schoolId/users', async (c) => {
        const schoolId = c.req.param('schoolId');
        const role = c.req.query('role') as (typeof userRoleEnum.enumValues)[number];
        if (!role || !userRoleEnum.enumValues.includes(role)) {
            return c.json({ success: false, error: 'Valid role query parameter is required' }, 400);
        }
        try {
            const db = getDbClient(c.env);
            const schoolUsers = await db.select({ user: users }).from(users)
                .innerJoin(schoolMembers, eq(users.id, schoolMembers.userId))
                .where(and(eq(schoolMembers.schoolId, schoolId), eq(schoolMembers.role, role)));
            return c.json({ success: true, data: schoolUsers.map(u => u.user) });
        } catch (error) {
            console.error('Failed to get school users:', error);
            return c.json({ success: false, error: 'Failed to retrieve school users' }, 500);
        }
    });
    app.route('/api/admin', adminApi);
    app.get('/api/admin/stats', authMiddleware, async (c: AuthenticatedContext) => {
        const user = c.get('user');
        if (user.role !== 'school_admin') return c.json({ success: false, error: 'Forbidden' }, 403);
        try {
            const db = getDbClient(c.env);
            const [memberInfo] = await db.select({ schoolId: schoolMembers.schoolId }).from(schoolMembers).where(eq(schoolMembers.userId, user.id)).limit(1);
            if (!memberInfo) return c.json({ success: false, error: 'Admin not associated with any school' }, 404);
            const { schoolId } = memberInfo;
            const [studentCount] = await db.select({ value: count() }).from(schoolMembers).where(and(eq(schoolMembers.schoolId, schoolId), eq(schoolMembers.role, 'student')));
            const [teacherCount] = await db.select({ value: count() }).from(schoolMembers).where(and(eq(schoolMembers.schoolId, schoolId), eq(schoolMembers.role, 'teacher')));
            const [parentCount] = await db.select({ value: count() }).from(schoolMembers).where(and(eq(schoolMembers.schoolId, schoolId), eq(schoolMembers.role, 'parent')));
            return c.json({ success: true, data: { totalStudents: studentCount.value, totalTeachers: teacherCount.value, totalParents: parentCount.value, alerts: 3, schoolId } });
        } catch (error) {
            console.error('Failed to get admin stats:', error);
            return c.json({ success: false, error: 'Failed to retrieve admin stats' }, 500);
        }
    });
    // --- TEACHER ROUTES ---
    app.get('/api/teacher/dashboard', authMiddleware, async (c: AuthenticatedContext) => {
        const user = c.get('user');
        if (user.role !== 'teacher') return c.json({ success: false, error: 'Forbidden' }, 403);
        try {
            const db = getDbClient(c.env);
            const teacherCourses = await db.select({ id: courses.id, name: courses.name }).from(courses).where(eq(courses.teacherId, user.id));
            const courseIds = teacherCourses.map(c => c.id);
            let assignmentsToGradeCount = 0;
            if (courseIds.length > 0) {
                const [result] = await db.select({ value: count() }).from(submissions).innerJoin(assignments, eq(submissions.assignmentId, assignments.id)).where(and(inArray(assignments.courseId, courseIds), isNull(submissions.grade)));
                assignmentsToGradeCount = result.value;
            }
            const schedule = [{ time: '09:00 AM', class: 'Math 101', room: '201' }, { time: '10:30 AM', class: 'Planning Period', room: '' }, { time: '12:00 PM', class: 'Science 8', room: '305' }];
            return c.json({ success: true, data: { schedule, assignmentsToGrade: assignmentsToGradeCount, classes: teacherCourses } });
        } catch (error) {
            console.error('Failed to get teacher dashboard:', error);
            return c.json({ success: false, error: 'Failed to retrieve teacher dashboard data' }, 500);
        }
    });
    // --- STUDENT ROUTES ---
    app.get('/api/student/dashboard', authMiddleware, async (c: AuthenticatedContext) => {
        const user = c.get('user');
        if (user.role !== 'student') return c.json({ success: false, error: 'Forbidden' }, 403);
        try {
            const db = getDbClient(c.env);
            const studentCourses = await db.select({ id: courses.id, name: courses.name, grade: enrollments.grade }).from(enrollments).innerJoin(courses, eq(enrollments.courseId, courses.id)).where(eq(enrollments.studentId, user.id));
            const courseIds = studentCourses.map(c => c.id);
            let upcomingAssignments: any[] = [];
            if (courseIds.length > 0) {
                upcomingAssignments = await db.select({ id: assignments.id, title: assignments.title, dueDate: assignments.dueDate, courseName: courses.name }).from(assignments).innerJoin(courses, eq(assignments.courseId, courses.id)).where(and(inArray(assignments.courseId, courseIds), gt(assignments.dueDate, new Date()))).orderBy(assignments.dueDate).limit(3);
            }
            return c.json({ success: true, data: { courses: studentCourses, upcomingAssignments } });
        } catch (error) {
            console.error('Failed to get student dashboard:', error);
            return c.json({ success: false, error: 'Failed to retrieve student dashboard data' }, 500);
        }
    });
    // --- PARENT ROUTE ---
    app.get('/api/parent/dashboard', authMiddleware, async (c: AuthenticatedContext) => {
        const user = c.get('user');
        if (user.role !== 'parent') return c.json({ success: false, error: 'Forbidden' }, 403);
        try {
            const db = getDbClient(c.env);
            const children = await db.select().from(users).where(and(eq(users.lastName, user.lastName ?? ''), eq(users.role, 'student')));
            const childrenData = await Promise.all(children.map(async (child) => {
                const [avgGrade] = await db.select({ value: avg(enrollments.grade) }).from(enrollments).where(eq(enrollments.studentId, child.id));
                return { id: child.id, firstName: child.firstName, lastName: child.lastName, avatarUrl: child.avatarUrl, gradeLevel: 'Grade 8', overallGrade: avgGrade.value ? parseFloat(avgGrade.value).toFixed(1) : 'N/A', attendance: '98%' };
            }));
            return c.json({ success: true, data: { children: childrenData } });
        } catch (error) {
            console.error('Failed to get parent dashboard:', error);
            return c.json({ success: false, error: 'Failed to retrieve parent dashboard data' }, 500);
        }
    });
}
const MOCK_PASSWORD_HASH = 'mock_hash_for_password123';
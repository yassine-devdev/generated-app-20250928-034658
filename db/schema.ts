import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  jsonb,
  boolean,
  integer,
  decimal,
  primaryKey,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
// Enums
export const userRoleEnum = pgEnum('user_role', ['owner', 'school_admin', 'teacher', 'student', 'parent']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'canceled', 'past_due', 'trialing']);
export const announcementTypeEnum = pgEnum('announcement_type', ['system', 'school', 'class']);
// Users & Roles
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  hashedPassword: text('hashed_password'),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  avatarUrl: text('avatar_url'),
  role: userRoleEnum('role').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
export const schools = pgTable('schools', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  ownerId: uuid('owner_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  whiteLabelConfig: jsonb('white_label_config'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
export const schoolMembers = pgTable('school_members', {
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  schoolId: uuid('school_id').references(() => schools.id, { onDelete: 'cascade' }).notNull(),
  role: userRoleEnum('role').notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.schoolId] }),
  };
});
// New table for parent-child links
export const parentLinks = pgTable('parent_links', {
  parentId: uuid('parent_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.parentId, table.studentId] }),
  };
});
// Billing
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  schoolId: uuid('school_id').references(() => schools.id, { onDelete: 'cascade' }).notNull().unique(),
  plan: varchar('plan', { length: 50 }).notNull(),
  status: subscriptionStatusEnum('status').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  subscriptionId: uuid('subscription_id').references(() => subscriptions.id).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(), // e.g., 'paid', 'open', 'void'
  dueDate: timestamp('due_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
// Academic
export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  schoolId: uuid('school_id').references(() => schools.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 100 }),
  description: text('description'),
  teacherId: uuid('teacher_id').references(() => users.id, { onDelete: 'set null' }),
});
export const enrollments = pgTable('enrollments', {
  studentId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  courseId: uuid('course_id').references(() => courses.id, { onDelete: 'cascade' }).notNull(),
  grade: decimal('grade', { precision: 5, scale: 2 }),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.studentId, table.courseId] }),
  };
});
export const assignments = pgTable('assignments', {
  id: uuid('id').primaryKey().defaultRandom(),
  courseId: uuid('course_id').references(() => courses.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  dueDate: timestamp('due_date'),
});
export const submissions = pgTable('submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  assignmentId: uuid('assignment_id').references(() => assignments.id, { onDelete: 'cascade' }).notNull(),
  studentId: uuid('student_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
  grade: decimal('grade', { precision: 5, scale: 2 }),
  content: text('content'),
});
// Communication
export const announcements = pgTable('announcements', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  schoolId: uuid('school_id').references(() => schools.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').references(() => courses.id, { onDelete: 'cascade' }),
  type: announcementTypeEnum('type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
// System & Analytics
export const systemSettings = pgTable('system_settings', {
  key: varchar('key', { length: 100 }).primaryKey(),
  value: jsonb('value'),
});
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: varchar('action', { length: 255 }).notNull(),
  details: jsonb('details'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});
// Knowledge Base for RAG
export const knowledgeBaseArticles = pgTable('knowledge_base_articles', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  ownedSchools: many(schools),
  schoolMemberships: many(schoolMembers),
  announcements: many(announcements),
  submissions: many(submissions),
  enrollments: many(enrollments),
  taughtCourses: many(courses),
  parentLinks: many(parentLinks, { relationName: 'parent' }),
  studentLinks: many(parentLinks, { relationName: 'student' }),
}));
export const schoolsRelations = relations(schools, ({ one, many }) => ({
  owner: one(users, {
    fields: [schools.ownerId],
    references: [users.id],
  }),
  members: many(schoolMembers),
  subscription: one(subscriptions, {
    fields: [schools.id],
    references: [subscriptions.schoolId],
  }),
  courses: many(courses),
}));
export const schoolMembersRelations = relations(schoolMembers, ({ one }) => ({
  user: one(users, {
    fields: [schoolMembers.userId],
    references: [users.id],
  }),
  school: one(schools, {
    fields: [schoolMembers.schoolId],
    references: [schools.id],
  }),
}));
export const parentLinksRelations = relations(parentLinks, ({ one }) => ({
  parent: one(users, {
    fields: [parentLinks.parentId],
    references: [users.id],
    relationName: 'parent',
  }),
  student: one(users, {
    fields: [parentLinks.studentId],
    references: [users.id],
    relationName: 'student',
  }),
}));
export const subscriptionsRelations = relations(subscriptions, ({ one, many }) => ({
  school: one(schools, {
    fields: [subscriptions.schoolId],
    references: [schools.id],
  }),
  invoices: many(invoices),
}));
export const coursesRelations = relations(courses, ({ one, many }) => ({
  school: one(schools, {
    fields: [courses.schoolId],
    references: [schools.id],
  }),
  teacher: one(users, {
    fields: [courses.teacherId],
    references: [users.id],
  }),
  enrollments: many(enrollments),
  assignments: many(assignments),
}));
export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  student: one(users, {
    fields: [enrollments.studentId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}));
export const assignmentsRelations = relations(assignments, ({ one, many }) => ({
  course: one(courses, {
    fields: [assignments.courseId],
    references: [courses.id],
  }),
  submissions: many(submissions),
}));
export const submissionsRelations = relations(submissions, ({ one }) => ({
  assignment: one(assignments, {
    fields: [submissions.assignmentId],
    references: [assignments.id],
  }),
  student: one(users, {
    fields: [submissions.studentId],
    references: [users.id],
  }),
}));
export const knowledgeBaseArticlesRelations = relations(knowledgeBaseArticles, () => ({
  // No relations needed for this simple implementation
}));
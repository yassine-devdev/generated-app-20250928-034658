import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuthStore } from '@/store/authStore';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
interface Course {
  id: string;
  name: string;
  grade: string | null;
}
interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  courseName: string;
}
interface StudentDashboardData {
  courses: Course[];
  upcomingAssignments: Assignment[];
}
export function StudentDashboardPage() {
  const [data, setData] = useState<StudentDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuthStore();
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch('/api/student/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch student dashboard data');
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || 'API returned an error');
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, [token]);
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-display font-bold">
        Hello, {user?.firstName || 'Student'}!
      </motion.h1>
      <motion.div variants={containerVariants} className="grid gap-8 md:grid-cols-2">
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card className="glass-pane">
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between"><Skeleton className="h-4 w-1/2" /><Skeleton className="h-4 w-1/4" /></div>
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))
              ) : (
                data?.courses.map(course => {
                  const grade = course.grade ? parseFloat(course.grade) : null;
                  return (
                    <div key={course.id}>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">{course.name}</span>
                        <span className="text-muted-foreground">{grade ? `${grade.toFixed(1)}%` : 'No grade'}</span>
                      </div>
                      <Progress value={grade ?? 0} />
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="glass-pane h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CalendarClock className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ) : (
                <ul className="space-y-3">
                  {data?.upcomingAssignments.map(assignment => (
                    <li key={assignment.id}>
                      <span className="font-semibold">{assignment.title}:</span> Due in {formatDistanceToNow(new Date(assignment.dueDate))}
                      <p className="text-xs text-muted-foreground">{assignment.courseName}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="glass-pane h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Grades</CardTitle>
              <Trophy className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
              ) : (
                <ul className="space-y-3">
                  {data?.courses.filter(c => c.grade).slice(0, 3).map(course => (
                    <li key={course.id}><span className="font-semibold">{course.name}:</span> {parseFloat(course.grade!).toFixed(1)}%</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
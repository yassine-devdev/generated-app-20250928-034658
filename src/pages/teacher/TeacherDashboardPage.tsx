import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ClipboardCheck, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { Skeleton } from '@/components/ui/skeleton';
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
interface ScheduleItem {
  time: string;
  class: string;
  room: string;
}
interface ClassItem {
  id: string;
  name: string;
}
interface TeacherDashboardData {
  schedule: ScheduleItem[];
  assignmentsToGrade: number;
  classes: ClassItem[];
}
export function TeacherDashboardPage() {
  const [data, setData] = useState<TeacherDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch('/api/teacher/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch teacher dashboard data');
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || 'API returned an error');
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
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
        Welcome, Teacher!
      </motion.h1>
      <motion.div variants={containerVariants} className="grid gap-8 md:grid-cols-2">
        <motion.div variants={itemVariants}>
          <Card className="glass-pane h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Today's Schedule</CardTitle>
              <Calendar className="w-5 h-5 text-muted-foreground" />
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
                  {data?.schedule.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{item.time} - {item.class}</span>
                      {item.room && <Badge variant="secondary">Room {item.room}</Badge>}
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
              <CardTitle>Assignments to Grade</CardTitle>
              <ClipboardCheck className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-1/4" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <>
                  <p className="text-4xl font-bold">{data?.assignmentsToGrade ?? 'N/A'}</p>
                  <p className="text-sm text-muted-foreground">Submissions waiting for review.</p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card className="glass-pane">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Classes</CardTitle>
              <BookOpen className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <>
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </>
              ) : (
                data?.classes.map((cls) => (
                  <div key={cls.id} className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold">{cls.name}</p>
                    {/* Student count can be added later */}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
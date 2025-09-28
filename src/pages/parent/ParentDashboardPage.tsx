import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserSquare, BarChart2, CheckCircle, Megaphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { Skeleton } from '@/components/ui/skeleton';
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
interface ChildData {
  id: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  gradeLevel: string;
  overallGrade: string;
  attendance: string;
}
interface ParentDashboardData {
  children: ChildData[];
}
export function ParentDashboardPage() {
  const [data, setData] = useState<ParentDashboardData | null>(null);
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
        const response = await fetch('/api/parent/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch parent dashboard data');
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || 'API returned an error');
        }
      } catch (error) {
        console.error("Error fetching parent data:", error);
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
        Parent Dashboard
      </motion.h1>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle>My Children</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))
            ) : (
              data?.children.map(child => (
                <div key={child.id} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={child.avatarUrl ?? `https://i.pravatar.cc/150?u=${child.id}`} />
                    <AvatarFallback>{child.firstName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{child.firstName}</p>
                    <p className="text-sm text-muted-foreground">{child.gradeLevel}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={containerVariants} className="grid gap-8 md:grid-cols-2">
        {isLoading ? (
          <motion.div variants={itemVariants}>
            <Card className="glass-pane h-full">
              <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          data?.children.map(child => (
            <motion.div variants={itemVariants} key={child.id}>
              <Card className="glass-pane h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{child.firstName}'s Overview</CardTitle>
                  <UserSquare className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2"><BarChart2 className="w-4 h-4" /><span>Overall Grade</span></div>
                    <Badge>{child.overallGrade !== 'N/A' ? `${child.overallGrade}%` : 'N/A'}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2"><CheckCircle className="w-4 h-4" /><span>Attendance</span></div>
                    <Badge variant="secondary">{child.attendance}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
        <motion.div variants={itemVariants}>
          <Card className="glass-pane h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>School Announcements</CardTitle>
              <Megaphone className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm">No new announcements today.</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
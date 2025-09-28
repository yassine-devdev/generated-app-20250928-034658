import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, UserRound, Bell } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
interface AdminStats {
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  alerts: number;
}
export function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    const fetchStats = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch admin stats');
        const result = await response.json();
        if (result.success) {
          setStats(result.data);
        } else {
          throw new Error(result.error || 'API returned an error');
        }
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [token]);
  const StatCardSkeleton = () => (
    <div className="p-4 glass-pane rounded-lg">
      <div className="flex items-center justify-between pb-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-4" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-display font-bold">
        School Admin Dashboard
      </motion.h1>
      <motion.div
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Total Students"
                value={stats?.totalStudents.toLocaleString() ?? 'N/A'}
                description="Active students"
                icon={Users}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Teachers"
                value={stats?.totalTeachers.toLocaleString() ?? 'N/A'}
                description="Active faculty"
                icon={GraduationCap}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Parents"
                value={stats?.totalParents.toLocaleString() ?? 'N/A'}
                description="Registered guardians"
                icon={UserRound}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Alerts"
                value={stats?.alerts.toLocaleString() ?? 'N/A'}
                description="Requires attention"
                icon={Bell}
              />
            </motion.div>
          </>
        )}
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <div className="text-sm text-muted-foreground">Oct 28</div>
                <div>
                  <p className="font-semibold">Parent-Teacher Conferences</p>
                  <p className="text-sm text-muted-foreground">Sign-ups are now open for next month's conferences.</p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="text-sm text-muted-foreground">Oct 25</div>
                <div>
                  <p className="font-semibold">School Picture Day</p>
                  <p className="text-sm text-muted-foreground">Picture day is scheduled for November 5th. Order forms sent home.</p>
                </div>
              </li>
            </ul>
            <Button variant="outline" className="mt-4">View All</Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
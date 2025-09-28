import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Building, DollarSign, ShoppingCart } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { ChartPlaceholder } from '@/components/ChartPlaceholder';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/store/authStore';
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
    }
  }
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -20,
    opacity: 0,
  }
};
interface StatsData {
  totalUsers: number;
  totalSchools: number;
  revenue: number;
  newSubscriptions: number;
}
export function AnalyticsUsagePage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    const fetchStats = async () => {
      if (!token) {
        setIsLoading(false);
        console.error("No auth token found");
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch('/api/owner/stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const result = await response.json();
        if (result.success) {
          setStats(result.data);
        } else {
          throw new Error(result.error || 'API returned an error');
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
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
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-display font-bold">
        Usage Statistics
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
                title="Total Users"
                value={stats?.totalUsers.toLocaleString() ?? 'N/A'}
                description="All roles across the platform"
                icon={Users}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Total Schools"
                value={stats?.totalSchools.toLocaleString() ?? 'N/A'}
                description="Onboarded and active schools"
                icon={Building}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="Revenue (Mock)"
                value={`$${stats?.revenue.toLocaleString() ?? 'N/A'}`}
                description="+8.2% from last month"
                icon={DollarSign}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatCard
                title="New Subs (Mock)"
                value={`+${stats?.newSubscriptions.toLocaleString() ?? 'N/A'}`}
                description="+32 since last hour"
                icon={ShoppingCart}
              />
            </motion.div>
          </>
        )}
      </motion.div>
      <motion.div variants={itemVariants}>
        <ChartPlaceholder />
      </motion.div>
    </motion.div>
  );
}
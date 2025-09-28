import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { StatCard } from '@/components/StatCard';
import { ChartPlaceholder } from '@/components/ChartPlaceholder';
import { BarChart, Users, TrendingUp, FileText } from 'lucide-react';
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
export function ReportsPlaceholderPage() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const pageName = pathParts.length > 0 ? pathParts[pathParts.length - 1].replace(/-/g, ' ') : 'Reports';
  const capitalizedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-display font-bold">
        {capitalizedPageName}
      </motion.h1>
      <motion.div
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants}>
          <StatCard title="Total Views" value="12,405" description="+15% from last month" icon={BarChart} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Unique Visitors" value="8,921" description="+8.2% from last month" icon={Users} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Conversion Rate" value="3.2%" description="+0.5% from last month" icon={TrendingUp} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Reports Generated" value="256" description="Data is up-to-date" icon={FileText} />
        </motion.div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <ChartPlaceholder />
      </motion.div>
    </motion.div>
  );
}
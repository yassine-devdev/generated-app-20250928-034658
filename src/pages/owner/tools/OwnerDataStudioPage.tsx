import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileBarChart, Wrench } from 'lucide-react';
import { ChartPlaceholder } from '@/components/ChartPlaceholder';
const mockReports = [
  { id: 1, name: 'Monthly Recurring Revenue (MRR)', description: 'Tracks the predictable recurring revenue.' },
  { id: 2, name: 'Customer Churn Rate', description: 'The rate at which customers stop doing business.' },
  { id: 3, name: 'Daily Active Users (DAU)', description: 'Measures the total number of unique users.' },
];
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};
export function OwnerDataStudioPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Data Studio</h1>
          <p className="text-muted-foreground">Create, view, and manage your custom reports.</p>
        </div>
        <Button><PlusCircle className="w-4 h-4 mr-2" /> New Report</Button>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle>Featured Report: MRR Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartPlaceholder />
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle>My Reports</CardTitle>
            <CardDescription>Your saved reports and dashboards.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockReports.map(report => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <FileBarChart className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm"><Wrench className="w-3 h-3 mr-2" /> Edit</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
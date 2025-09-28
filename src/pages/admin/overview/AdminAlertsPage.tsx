import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, UserPlus, FileWarning } from 'lucide-react';
const mockAlerts = [
  { id: 1, title: 'New Teacher Onboarding', description: 'Lyra Vega has completed onboarding. Please verify their profile.', icon: UserPlus, action: 'Verify Profile' },
  { id: 2, title: 'Failing Grades Report', description: '5 students in Math 101 have grades below 60%.', icon: FileWarning, action: 'View Report' },
  { id: 3, title: 'High Absenteeism', description: 'Leo Minor has been absent for 3 consecutive days.', icon: AlertTriangle, action: 'Contact Parent' },
];
export function AdminAlertsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-display font-bold">Alerts & Notifications</h1>
      <div className="space-y-6">
        {mockAlerts.map(alert => (
          <motion.div key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-pane">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="p-3 bg-destructive/10 rounded-full">
                  <alert.icon className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <CardTitle>{alert.title}</CardTitle>
                  <CardDescription>{alert.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button>{alert.action}</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { CalendarClock } from 'lucide-react';
const mockAssignments = [
  { id: 1, title: 'Photosynthesis Essay', course: 'Science 8', dueDate: new Date(Date.now() + 86400000 * 2) },
  { id: 2, title: 'Chapter 6 Problem Set', course: 'Math 101', dueDate: new Date(Date.now() + 86400000 * 4) },
  { id: 3, title: 'Poetry Analysis', course: 'English 9', dueDate: new Date(Date.now() + 86400000 * 7) },
  { id: 4, title: 'The Roman Empire Presentation', course: 'History 10', dueDate: new Date(Date.now() + 86400000 * 10) },
];
export function StudentUpcomingAssignmentsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-display font-bold">Upcoming Assignments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAssignments.map(assign => (
          <motion.div key={assign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-pane h-full">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">{assign.course}</Badge>
                <CardTitle>{assign.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-primary">
                  <CalendarClock className="w-5 h-5" />
                  <span className="font-semibold">Due in {formatDistanceToNow(assign.dueDate)}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Megaphone } from 'lucide-react';
import { format } from 'date-fns';
const mockAnnouncements = [
  { id: 1, title: 'Parent-Teacher Conferences Next Week', content: 'Please remember to sign up for a time slot for next week\'s parent-teacher conferences. We look forward to seeing you there!', date: new Date(Date.now() - 86400000 * 2) },
  { id: 2, title: 'School Picture Day - Nov 5th', content: 'School picture day is scheduled for November 5th. Order forms have been sent home with your student. Please ensure they are returned by November 1st.', date: new Date(Date.now() - 86400000 * 5) },
  { id: 3, title: 'Fundraiser Kick-off', content: 'Our annual fall fundraiser starts next Monday! All proceeds will go towards new equipment for the science labs. Thank you for your support!', date: new Date(Date.now() - 86400000 * 10) },
];
export function ParentAnnouncementsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-display font-bold">School Announcements</h1>
      <div className="space-y-6">
        {mockAnnouncements.map(ann => (
          <motion.div key={ann.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-pane">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Megaphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{ann.title}</CardTitle>
                    <CardDescription>{format(ann.date, 'PPPP')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{ann.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
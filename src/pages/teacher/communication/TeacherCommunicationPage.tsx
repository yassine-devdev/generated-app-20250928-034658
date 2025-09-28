import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Megaphone, Send, History } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
const mockClasses = [
  { id: '1', name: 'Math 101' },
  { id: '2', name: 'Science 8' },
  { id: '3', name: 'English 9' },
];
const mockAnnouncements = [
  { id: 1, class: 'Math 101', message: 'Reminder: Quiz on Chapter 5 tomorrow!', date: new Date(Date.now() - 86400000) },
  { id: 2, class: 'Science 8', message: 'Lab reports are due this Friday. Please submit them on time.', date: new Date(Date.now() - 86400000 * 2) },
  { id: 3, class: 'All Classes', message: 'Parent-teacher conferences are next week. Sign-up sheets are available.', date: new Date(Date.now() - 86400000 * 5) },
];
export function TeacherCommunicationPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-display font-bold">Communication</h1>
      <Tabs defaultValue="compose" className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="compose">
          <Card className="glass-pane">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Megaphone className="w-6 h-6 text-primary" /> Send Announcement</CardTitle>
              <CardDescription>Send a message to all students and parents in a selected class.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class to message" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {mockClasses.map(cls => (
                      <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Textarea placeholder="Type your announcement here..." rows={6} />
              </div>
            </CardContent>
            <CardFooter>
              <Button><Send className="w-4 h-4 mr-2" /> Send Announcement</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card className="glass-pane">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><History className="w-6 h-6 text-primary" /> Announcement History</CardTitle>
              <CardDescription>A log of all announcements you have sent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAnnouncements.map(ann => (
                <div key={ann.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-primary">{ann.class}</p>
                    <p className="text-xs text-muted-foreground">{format(ann.date, 'PP')}</p>
                  </div>
                  <p className="text-sm mt-1">{ann.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
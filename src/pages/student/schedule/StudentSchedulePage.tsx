import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
const scheduleData = {
  '8:00 AM': { Monday: 'Math 101', Tuesday: '', Wednesday: 'Math 101', Thursday: '', Friday: 'Math 101' },
  '9:00 AM': { Monday: '', Tuesday: 'Science 8', Wednesday: '', Thursday: 'Science 8', Friday: '' },
  '10:00 AM': { Monday: 'English 9', Tuesday: '', Wednesday: 'English 9', Thursday: '', Friday: 'English 9' },
  '11:00 AM': { Monday: '', Tuesday: 'History 10', Wednesday: '', Thursday: 'History 10', Friday: '' },
  '12:00 PM': { Monday: 'Lunch', Tuesday: 'Lunch', Wednesday: 'Lunch', Thursday: 'Lunch', Friday: 'Lunch' },
  '1:00 PM': { Monday: 'Study Hall', Tuesday: 'Art', Wednesday: 'Study Hall', Thursday: 'Art', Friday: 'Study Hall' },
  '2:00 PM': { Monday: 'Physical Ed.', Tuesday: '', Wednesday: 'Physical Ed.', Thursday: '', Friday: 'Physical Ed.' },
};
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = Object.keys(scheduleData);
export function StudentSchedulePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-display font-bold">My Weekly Schedule</h1>
      <Card className="glass-pane">
        <CardHeader>
          <CardTitle>Fall Semester Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Time</TableHead>
                  {days.map(day => <TableHead key={day}>{day}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {times.map(time => (
                  <TableRow key={time}>
                    <TableCell className="font-semibold text-muted-foreground">{time}</TableCell>
                    {days.map(day => (
                      <TableCell key={day} className={scheduleData[time][day] ? 'font-medium' : ''}>
                        {scheduleData[time][day]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
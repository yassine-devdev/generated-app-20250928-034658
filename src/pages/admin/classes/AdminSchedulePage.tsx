import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, User, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
const scheduleData: { [time: string]: { [day: string]: { class: string; teacher: string; room: string } | null } } = {
  '8:00 AM': { Monday: { class: 'Math 101', teacher: 'Lyra Vega', room: '201' }, Tuesday: null, Wednesday: { class: 'Math 101', teacher: 'Lyra Vega', room: '201' }, Thursday: null, Friday: { class: 'Math 101', teacher: 'Lyra Vega', room: '201' } },
  '9:00 AM': { Monday: null, Tuesday: { class: 'Science 8', teacher: 'Lyra Vega', room: '305' }, Wednesday: null, Thursday: { class: 'Science 8', teacher: 'Lyra Vega', room: '305' }, Friday: null },
  '10:00 AM': { Monday: { class: 'English 9', teacher: 'Orion Stark', room: '102' }, Tuesday: null, Wednesday: { class: 'English 9', teacher: 'Orion Stark', room: '102' }, Thursday: null, Friday: { class: 'English 9', teacher: 'Orion Stark', room: '102' } },
  '11:00 AM': { Monday: null, Tuesday: { class: 'History 10', teacher: 'Orion Stark', room: '105' }, Wednesday: null, Thursday: { class: 'History 10', teacher: 'Orion Stark', room: '105' }, Friday: null },
  '12:00 PM': { Monday: { class: 'Lunch', teacher: '', room: 'Cafeteria' }, Tuesday: { class: 'Lunch', teacher: '', room: 'Cafeteria' }, Wednesday: { class: 'Lunch', teacher: '', room: 'Cafeteria' }, Thursday: { class: 'Lunch', teacher: '', room: 'Cafeteria' }, Friday: { class: 'Lunch', teacher: '', room: 'Cafeteria' } },
  '1:00 PM': { Monday: { class: 'Study Hall', teacher: 'Proctor', room: 'Library' }, Tuesday: { class: 'Art', teacher: 'Guest', room: 'Art Room' }, Wednesday: { class: 'Study Hall', teacher: 'Proctor', room: 'Library' }, Thursday: { class: 'Art', teacher: 'Guest', room: 'Art Room' }, Friday: { class: 'Study Hall', teacher: 'Proctor', room: 'Library' } },
};
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = Object.keys(scheduleData);
const ScheduleCell = ({ event }: { event: { class: string; teacher: string; room: string } | null }) => {
  if (!event || !event.class) {
    return <div className="h-12"></div>;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="h-12 p-1 cursor-pointer hover:bg-muted/50 rounded-md transition-colors">
          <p className="font-medium text-xs truncate">{event.class}</p>
          <p className="text-2xs text-muted-foreground truncate">{event.teacher}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.class}</DialogTitle>
          <DialogDescription>Details for this class session.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <div className="flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" /> <span>Teacher: <span className="font-medium">{event.teacher}</span></span></div>
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /> <span>Room: <span className="font-medium">{event.room}</span></span></div>
          <Badge>18 / 25 Students</Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export function AdminSchedulePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Master Schedule</h1>
        <Button><PlusCircle className="w-4 h-4 mr-2" /> Add Event</Button>
      </div>
      <Card className="glass-pane">
        <CardHeader>
          <CardTitle>Weekly Class Schedule Overview</CardTitle>
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
                    <TableCell className="font-semibold text-muted-foreground align-top pt-3">{time}</TableCell>
                    {days.map(day => (
                      <TableCell key={day} className="p-0">
                        <ScheduleCell event={scheduleData[time][day]} />
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
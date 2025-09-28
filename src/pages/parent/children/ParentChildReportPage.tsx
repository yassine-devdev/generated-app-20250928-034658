import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart, CheckCircle, MessageSquare } from 'lucide-react';
import { ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, BarChart as RechartsBarChart } from 'recharts';
const reportData = {
  student: { name: 'Alex Ryder', avatar: 'https://i.pravatar.cc/150?u=alex' },
  overallGrade: 91.3,
  attendance: '98%',
  gradesBySubject: [
    { subject: 'Math', grade: 92.5 },
    { subject: 'Science', grade: 88.0 },
    { subject: 'English', grade: 95.2 },
    { subject: 'History', grade: 89.0 },
  ],
  teacherComments: [
    { teacher: 'Lyra Vega', subject: 'Math', comment: 'Alex is a pleasure to have in class. Consistently participates and excels in problem-solving.' },
    { teacher: 'Orion Stark', subject: 'English', comment: 'Excellent analysis in the recent essay. Keep up the great work!' },
  ],
};
export function ParentChildReportPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={reportData.student.avatar} />
          <AvatarFallback>{reportData.student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-display font-bold">{reportData.student.name}'s Report</h1>
          <p className="text-muted-foreground">Fall Semester Progress</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-pane"><CardHeader><CardTitle>Overall Grade</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold text-primary">{reportData.overallGrade}%</p></CardContent></Card>
        <Card className="glass-pane"><CardHeader><CardTitle>Attendance</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold text-primary">{reportData.attendance}</p></CardContent></Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart className="w-5 h-5" /> Grades by Subject</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={reportData.gradesBySubject} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="subject" width={80} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'hsl(var(--muted)/0.5)' }} contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                <Bar dataKey="grade" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Teacher Comments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportData.teacherComments.map(c => (
              <div key={c.teacher} className="p-3 bg-muted/50 rounded-lg">
                <p className="font-semibold">{c.teacher} <span className="text-xs text-muted-foreground">({c.subject})</span></p>
                <p className="text-sm text-muted-foreground italic">"{c.comment}"</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
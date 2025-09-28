import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, BookOpen, Trophy } from 'lucide-react';
const courseData = {
  name: 'Science 8',
  teacher: { name: 'Lyra Vega', avatar: 'https://i.pravatar.cc/150?u=lyra' },
  description: 'An introductory course to the wonders of biological and physical sciences. This semester focuses on cell biology, genetics, and basic chemistry.',
  assignments: [
    { title: 'Photosynthesis Essay', dueDate: 'Nov 18', status: 'Submitted' },
    { title: 'Cell Diagram', dueDate: 'Nov 25', status: 'Upcoming' },
  ],
  resources: [
    { title: 'Course Syllabus', type: 'PDF' },
    { title: 'Chapter 3: Cell Structure', type: 'PDF' },
  ],
  grades: [
    { item: 'Quiz 1', grade: '88%' },
    { item: 'Lab Report 1', grade: '92%' },
  ]
};
export function StudentCourseDetailPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-display font-bold">{courseData.name}</h1>
        <div className="flex items-center gap-2 mt-2 text-muted-foreground">
          <Avatar className="h-6 w-6"><AvatarImage src={courseData.teacher.avatar} /><AvatarFallback>T</AvatarFallback></Avatar>
          <span>Taught by {courseData.teacher.name}</span>
        </div>
      </div>
      <Card className="glass-pane">
        <CardHeader>
          <CardTitle>Course Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{courseData.description}</p>
        </CardContent>
      </Card>
      <Tabs defaultValue="assignments">
        <TabsList>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
        </TabsList>
        <TabsContent value="assignments">
          <ul className="space-y-3 mt-4">
            {courseData.assignments.map(a => (
              <li key={a.title} className="p-3 bg-muted/50 rounded-lg flex justify-between items-center">
                <p className="font-medium">{a.title}</p>
                <p className="text-sm text-muted-foreground">Due: {a.dueDate}</p>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="resources">
          <ul className="space-y-3 mt-4">
            {courseData.resources.map(r => (
              <li key={r.title} className="p-3 bg-muted/50 rounded-lg flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <p className="font-medium">{r.title} <span className="text-xs text-muted-foreground">({r.type})</span></p>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="grades">
          <ul className="space-y-3 mt-4">
            {courseData.grades.map(g => (
              <li key={g.item} className="p-3 bg-muted/50 rounded-lg flex justify-between items-center">
                <p className="font-medium">{g.item}</p>
                <p className="font-bold text-primary">{g.grade}</p>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
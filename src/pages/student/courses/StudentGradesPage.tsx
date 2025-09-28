import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';
const mockGrades = [
  {
    course: 'Math 101',
    overallGrade: 92.5,
    assignments: [
      { title: 'Homework 1', grade: 95 },
      { title: 'Quiz 1', grade: 88 },
      { title: 'Midterm Exam', grade: 91 },
    ],
  },
  {
    course: 'Science 8',
    overallGrade: 88.0,
    assignments: [
      { title: 'Lab Report 1', grade: 90 },
      { title: 'Photosynthesis Quiz', grade: 85 },
      { title: 'Project: Solar System', grade: 89 },
    ],
  },
  {
    course: 'English 9',
    overallGrade: 95.2,
    assignments: [
      { title: 'Essay: The Great Gatsby', grade: 94 },
      { title: 'Poetry Analysis', grade: 98 },
      { title: 'Vocabulary Test', grade: 93 },
    ],
  },
];
export function StudentGradesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-display font-bold">My Grades</h1>
      <Card className="glass-pane">
        <CardHeader>
          <CardTitle>Grades by Course</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {mockGrades.map((course) => (
              <AccordionItem key={course.course} value={course.course}>
                <AccordionTrigger>
                  <div className="flex justify-between items-center w-full pr-4">
                    <span className="font-semibold text-lg">{course.course}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">Overall:</span>
                      <span className="font-bold text-primary text-xl">{course.overallGrade.toFixed(1)}%</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pl-2">
                    {course.assignments.map((assignment) => (
                      <div key={assignment.title} className="flex justify-between items-center">
                        <p className="text-muted-foreground">{assignment.title}</p>
                        <p className="font-medium">{assignment.grade}%</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
}
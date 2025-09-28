import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CheckCircle, Clock } from 'lucide-react';
const mockSubmissions = [
  { id: 1, title: 'Algebra Homework 5', course: 'Math 101', submitted: new Date(Date.now() - 86400000), grade: 95, status: 'Graded' },
  { id: 2, title: 'The Great Gatsby Essay', course: 'English 9', submitted: new Date(Date.now() - 86400000 * 3), grade: 88, status: 'Graded' },
  { id: 3, title: 'Photosynthesis Lab Report', course: 'Science 8', submitted: new Date(Date.now() - 3600000), grade: null, status: 'Submitted' },
];
export function StudentSubmittedPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-display font-bold">Submitted Assignments</h1>
      <Card className="glass-pane">
        <CardHeader>
          <CardTitle>Submission History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSubmissions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.title}</TableCell>
                  <TableCell>{sub.course}</TableCell>
                  <TableCell>{format(sub.submitted, 'PP')}</TableCell>
                  <TableCell>
                    {sub.status === 'Submitted' && <Badge variant="default" className="bg-blue-500/20 text-blue-400 border-blue-500/30"><Clock className="w-3 h-3 mr-1" />Submitted</Badge>}
                    {sub.status === 'Graded' && <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" />Graded</Badge>}
                  </TableCell>
                  <TableCell className="text-right font-bold">{sub.grade ? `${sub.grade}%` : '–'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
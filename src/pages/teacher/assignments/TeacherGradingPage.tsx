import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Clock, Edit } from 'lucide-react';
const mockSubmissions = [
  { id: '1', studentName: 'Leo Minor', status: 'Submitted', grade: null, submissionDate: '2024-11-14T10:00:00Z' },
  { id: '2', studentName: 'Alex Ryder', status: 'Graded', grade: 95, submissionDate: '2024-11-13T15:30:00Z' },
  { id: '3', studentName: 'Orion Stark', status: 'Not Submitted', grade: null, submissionDate: null },
  { id: '4', studentName: 'Cassiopeia Minor', status: 'Submitted', grade: null, submissionDate: '2024-11-15T09:00:00Z' },
];
export function TeacherGradingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-display font-bold">Grade Submissions</h1>
        <p className="text-muted-foreground">Assignment: Algebra Homework 5</p>
      </div>
      <Card className="glass-pane">
        <CardHeader>
          <CardTitle>Student Submissions</CardTitle>
          <CardDescription>Review submissions and enter grades for your students.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Grade</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSubmissions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.studentName}</TableCell>
                  <TableCell>
                    {sub.status === 'Submitted' && <Badge variant="default" className="bg-blue-500/20 text-blue-400 border-blue-500/30"><Clock className="w-3 h-3 mr-1" />Submitted</Badge>}
                    {sub.status === 'Graded' && <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" />Graded</Badge>}
                    {sub.status === 'Not Submitted' && <Badge variant="destructive">Not Submitted</Badge>}
                  </TableCell>
                  <TableCell className="text-center">{sub.grade ?? '–'}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" disabled={sub.status === 'Not Submitted'}>
                          <Edit className="w-3 h-3 mr-2" />
                          {sub.grade ? 'Edit Grade' : 'Grade'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Grade Submission for {sub.studentName}</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <Label htmlFor="grade">Grade (%)</Label>
                          <Input id="grade" type="number" defaultValue={sub.grade ?? ''} placeholder="Enter grade from 0-100" />
                        </div>
                        <DialogFooter>
                          <Button>Save Grade</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
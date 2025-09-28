import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileUp, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Toaster, toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
// A more detailed type for this page
interface AssignmentDetails {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  course: { name: string };
  submission: {
    id: string;
    content: string;
    grade: string | null;
    submittedAt: string;
  } | null;
}
export function StudentAssignmentViewPage() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const [assignment, setAssignment] = useState<AssignmentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionContent, setSubmissionContent] = useState('');
  const token = useAuthStore((state) => state.token);
  const fetchAssignment = useCallback(async () => {
    if (!token || !assignmentId) return;
    setIsLoading(true);
    try {
      // NOTE: API endpoint for fetching a single assignment doesn't exist yet.
      // This is a placeholder for when it's created. For now, we'll use mock data.
      // const response = await fetch(`/api/student/assignments/${assignmentId}`, { headers: { Authorization: `Bearer ${token}` } });
      // const result = await response.json();
      // if(result.success) setAssignment(result.data); else toast.error("Failed to load assignment");
      // Mock data until API is ready
      setAssignment({
        id: assignmentId,
        title: 'Photosynthesis Essay',
        course: { name: 'Science 8' },
        dueDate: '2024-11-18T23:59:59Z',
        description: 'Write a 500-word essay on the process of photosynthesis. Include details about light-dependent and light-independent reactions. Please cite at least two sources.',
        submission: null,
      });
    } catch (error) {
      toast.error("An error occurred while fetching the assignment.");
    } finally {
      setIsLoading(false);
    }
  }, [assignmentId, token]);
  useEffect(() => {
    fetchAssignment();
  }, [fetchAssignment]);
  const handleSubmit = async () => {
    if (!submissionContent.trim()) {
      toast.error("Submission content cannot be empty.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/student/assignments/${assignmentId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: submissionContent }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Assignment submitted successfully!");
        fetchAssignment(); // Refresh data
      } else {
        toast.error(result.error || "Failed to submit assignment.");
      }
    } catch (error) {
      toast.error("An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoading) {
    return <Skeleton className="w-full h-96" />;
  }
  if (!assignment) {
    return <div>Assignment not found.</div>;
  }
  const status = assignment.submission ? (assignment.submission.grade ? 'Graded' : 'Submitted') : 'Not Submitted';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <Toaster />
      <div>
        <p className="text-primary font-semibold">{assignment.course.name}</p>
        <h1 className="text-3xl font-display font-bold">{assignment.title}</h1>
        <p className="text-muted-foreground">Due: {assignment.dueDate ? format(new Date(assignment.dueDate), 'PPp') : 'N/A'}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="glass-pane">
            <CardHeader><CardTitle>Instructions</CardTitle></CardHeader>
            <CardContent><p className="whitespace-pre-wrap">{assignment.description}</p></CardContent>
          </Card>
        </div>
        <div>
          <Card className="glass-pane">
            <CardHeader><CardTitle>Your Submission</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Status:</span>
                {status === 'Not Submitted' && <Badge variant="destructive">Not Submitted</Badge>}
                {status === 'Submitted' && <Badge variant="default" className="bg-blue-500/20 text-blue-400 border-blue-500/30"><Clock className="w-3 h-3 mr-1" />Submitted</Badge>}
                {status === 'Graded' && <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" />Graded</Badge>}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Grade:</span>
                <span className="font-bold text-lg">{assignment.submission?.grade ? `${assignment.submission.grade}%` : '–'}</span>
              </div>
              {status !== 'Graded' && (
                <Textarea
                  placeholder="Type your submission here..."
                  rows={6}
                  value={submissionContent}
                  onChange={(e) => setSubmissionContent(e.target.value)}
                  disabled={isSubmitting || !!assignment.submission}
                />
              )}
              {assignment.submission && (
                <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-semibold">Your submission:</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{assignment.submission.content}</p>
                </div>
              )}
            </CardContent>
            {status !== 'Graded' && (
              <CardFooter>
                <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting || !!assignment.submission}>
                  {isSubmitting ? 'Submitting...' : (assignment.submission ? 'Resubmit' : 'Submit Assignment')}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
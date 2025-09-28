import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
import { useAuthStore } from '@/store/authStore';
import { Assignment } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster, toast } from 'sonner';
import { DataTable } from '@/components/data-table/DataTable';
import { columns } from '@/components/data-table/AssignmentListColumns';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
export function TeacherAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const fetchAssignments = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/teacher/assignments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        setAssignments(result.data);
      } else {
        toast.error('Failed to fetch assignments.');
      }
    } catch (error) {
      toast.error('An error occurred while fetching assignments.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);
  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);
  const handleGradeSubmissions = (row: Row<Assignment>) => {
    navigate(`/dashboard/teacher/assignments/${row.original.id}/grading`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <Toaster />
      <h1 className="text-3xl font-display font-bold">All Assignments</h1>
      <Card className="glass-pane">
        <CardHeader>
          <CardTitle>Assignment Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          ) : assignments.length > 0 ? (
            <DataTable
              columns={columns}
              data={assignments}
              filterColumnId="title"
              filterPlaceholder="Filter by title..."
              onAddUser={() => navigate('/dashboard/teacher/assignments/create')}
              onEditRow={() => {}} // Not used for this table
              onDeleteRow={() => {}} // Not used for this table
              meta={{
                gradeSubmissions: handleGradeSubmissions,
              }}
            />
          ) : (
            <EmptyState
              icon={FileText}
              title="No Assignments Found"
              description="You haven't created any assignments yet. Get started by creating a new one."
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
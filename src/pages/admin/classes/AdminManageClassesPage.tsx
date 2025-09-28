import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { DataTable } from '@/components/data-table/DataTable';
import { columns } from '@/components/data-table/ClassListColumns';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { Row } from '@tanstack/react-table';
import { BookUser } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
import { useAuthStore } from '@/store/authStore';
import { Course, ClassFormValues, User } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { ClassFormSheet } from '@/components/forms/ClassFormSheet';
export function AdminManageClassesPage() {
  const [classes, setClasses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Course | null>(null);
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);
  const fetchSchoolId = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success && result.data.schoolId) {
        setSchoolId(result.data.schoolId);
      } else {
        toast.error('Could not determine your school.');
      }
    } catch (error) {
      toast.error('Failed to fetch school information.');
    }
  }, [token]);
  useEffect(() => {
    fetchSchoolId();
  }, [fetchSchoolId]);
  const fetchData = useCallback(async () => {
    if (!token || !schoolId) return;
    setIsLoading(true);
    try {
      const [classesRes, teachersRes] = await Promise.all([
        fetch(`/api/admin/schools/${schoolId}/classes`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`/api/admin/schools/${schoolId}/users?role=teacher`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const classesResult = await classesRes.json();
      const teachersResult = await teachersRes.json();
      if (classesResult.success) setClasses(classesResult.data);
      else toast.error('Failed to fetch classes.');
      if (teachersResult.success) setTeachers(teachersResult.data);
      else toast.error('Failed to fetch teachers.');
    } catch (error) {
      toast.error('An error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  }, [token, schoolId]);
  useEffect(() => {
    if (schoolId) {
      fetchData();
    }
  }, [schoolId, fetchData]);
  const handleAddClass = () => {
    setSelectedClass(null);
    setIsSheetOpen(true);
  };
  const handleEditClass = (row: Row<Course>) => {
    setSelectedClass(row.original);
    setIsSheetOpen(true);
  };
  const handleDeleteClass = async (row: Row<Course>) => {
    const classToDelete = row.original;
    try {
      const response = await fetch(`/api/admin/schools/${schoolId}/classes/${classToDelete.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        toast.success(`Class "${classToDelete.name}" deleted successfully.`);
        fetchData();
      } else {
        toast.error(result.error || 'Failed to delete class.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the class.');
    }
  };
  const handleFormSubmit = async (data: ClassFormValues) => {
    if (!schoolId) return;
    setIsSubmitting(true);
    const url = selectedClass
      ? `/api/admin/schools/${schoolId}/classes/${selectedClass.id}`
      : `/api/admin/schools/${schoolId}/classes`;
    const method = selectedClass ? 'PUT' : 'POST';
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(`Class ${selectedClass ? 'updated' : 'created'} successfully.`);
        setIsSheetOpen(false);
        fetchData();
      } else {
        toast.error(result.error || 'Failed to save class.');
      }
    } catch (error) {
      toast.error('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const tableData = classes.map(c => ({
    ...c,
    teacher: c.teacherFirstName ? `${c.teacherFirstName} ${c.teacherLastName}` : 'Unassigned',
    students: c.studentCount,
  }));
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <Toaster />
      <h1 className="text-3xl font-display font-bold mb-8">Manage Classes</h1>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={tableData}
          filterColumnId="name"
          filterPlaceholder="Filter by class name..."
          onAddUser={handleAddClass}
          onEditRow={handleEditClass as (row: Row<any>) => void}
          onDeleteRow={handleDeleteClass as (row: Row<any>) => void}
        />
      )}
      <ClassFormSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSubmit={handleFormSubmit}
        defaultValues={selectedClass}
        isLoading={isSubmitting}
        teachers={teachers}
      />
    </motion.div>
  );
}
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { DataTable } from '@/components/data-table/DataTable';
import { columns } from '@/components/data-table/SchoolsListColumns';
import { useAuthStore } from '@/store/authStore';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';
import { Row } from '@tanstack/react-table';
// Assuming a School type based on db/schema.ts
type School = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
export function SchoolsListPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const fetchSchools = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/owner/schools', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        setSchools(result.data);
      } else {
        toast.error('Failed to fetch schools.');
      }
    } catch (error) {
      toast.error('An error occurred while fetching schools.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);
  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);
  const handleManageUsers = (row: Row<School>) => {
    navigate(`/dashboard/owner/schools/${row.original.id}/users`);
  };
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Toaster />
      <h1 className="text-3xl font-display font-bold mb-8">
        Manage Schools
      </h1>
      <DataTable
        columns={columns}
        data={schools}
        filterColumnId="name"
        filterPlaceholder="Filter by school name..."
        onAddUser={() => toast.info('Onboarding wizard coming soon!')}
        onEditRow={handleManageUsers} // Re-using onEditRow for navigation
        onDeleteRow={(row: Row<School>) => toast.error('Delete functionality not implemented.')}
      />
    </motion.div>
  );
}
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { DataTable } from '@/components/data-table/DataTable';
import { columns } from '@/components/data-table/DataTableColumns';
import { UserFormSheet } from '@/components/forms/UserFormSheet';
import { useAuthStore } from '@/store/authStore';
import { User, UserFormValues } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { Row } from '@tanstack/react-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
type UserRole = 'teacher' | 'student' | 'parent';
const roles: UserRole[] = ['teacher', 'student', 'parent'];
const roleToTitle: Record<UserRole, string> = {
  teacher: 'Teachers',
  student: 'Students',
  parent: 'Parents',
};
export function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState<UserRole>('teacher');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    const fetchSchoolId = async () => {
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
    };
    fetchSchoolId();
  }, [token]);
  const fetchUsers = useCallback(async (role: UserRole) => {
    if (!token || !schoolId) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/schools/${schoolId}/users?role=${role}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        setUsers(result.data);
      } else {
        toast.error(`Failed to fetch ${roleToTitle[role]}.`);
        setUsers([]);
      }
    } catch (error) {
      toast.error(`An error occurred while fetching ${roleToTitle[role]}.`);
    } finally {
      setIsLoading(false);
    }
  }, [token, schoolId]);
  useEffect(() => {
    if (schoolId) {
      fetchUsers(activeTab);
    }
  }, [fetchUsers, activeTab, schoolId]);
  const handleAddUser = () => {
    setSelectedUser(null);
    setIsSheetOpen(true);
  };
  const handleEditUser = (row: Row<User>) => {
    setSelectedUser(row.original);
    setIsSheetOpen(true);
  };
  const handleDeleteUser = async (row: Row<User>) => {
    const userToDelete = row.original;
    try {
      const response = await fetch(`/api/admin/schools/${schoolId}/users/${userToDelete.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.success) {
        toast.success(`User ${userToDelete.firstName} deleted successfully.`);
        fetchUsers(activeTab);
      } else {
        toast.error(result.error || 'Failed to delete user.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the user.');
    }
  };
  const handleFormSubmit = async (data: UserFormValues) => {
    if (!schoolId) return;
    setIsSubmitting(true);
    const url = selectedUser ? `/api/admin/schools/${schoolId}/users/${selectedUser.id}` : `/api/admin/schools/${schoolId}/users`;
    const method = selectedUser ? 'PUT' : 'POST';
    const body = selectedUser ? JSON.stringify(data) : JSON.stringify({ ...data, role: activeTab });
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body,
      });
      const result = await response.json();
      if (result.success) {
        toast.success(`User ${selectedUser ? 'updated' : 'created'} successfully.`);
        setIsSheetOpen(false);
        fetchUsers(activeTab);
      } else {
        toast.error(result.error || 'Failed to save user.');
      }
    } catch (error) {
      toast.error('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!schoolId && !isLoading) {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Unable to load school data</AlertTitle>
        <AlertDescription>
          We couldn't find a school associated with your account. Please contact support.
        </AlertDescription>
      </Alert>
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
        Manage School Users
      </h1>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UserRole)}>
        <TabsList>
          {roles.map(role => (
            <TabsTrigger key={role} value={role}>{roleToTitle[role]}</TabsTrigger>
          ))}
        </TabsList>
        {roles.map(role => (
          <TabsContent key={role} value={role}>
            {isLoading || !schoolId ? (
              <div className="space-y-4 mt-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={users}
                filterColumnId="email"
                filterPlaceholder={`Filter ${roleToTitle[role].toLowerCase()} by email...`}
                onAddUser={handleAddUser}
                onEditRow={handleEditUser}
                onDeleteRow={handleDeleteUser}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
      <UserFormSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSubmit={handleFormSubmit}
        defaultValues={selectedUser}
        isLoading={isSubmitting}
      />
    </motion.div>
  );
}
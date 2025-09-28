import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
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
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
type UserRole = 'school_admin' | 'teacher' | 'student' | 'parent';
const roles: UserRole[] = ['school_admin', 'teacher', 'student', 'parent'];
const roleToTitle: Record<UserRole, string> = {
  school_admin: 'Admins',
  teacher: 'Teachers',
  student: 'Students',
  parent: 'Parents',
};
export function SchoolUsersPage() {
  const { schoolId } = useParams<{ schoolId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<UserRole>('school_admin');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const token = useAuthStore((state) => state.token);
  const fetchUsers = useCallback(async (role: UserRole) => {
    if (!token || !schoolId) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/owner/schools/${schoolId}/users?role=${role}`, {
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
    fetchUsers(activeTab);
  }, [fetchUsers, activeTab]);
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
      const response = await fetch(`/api/owner/users/${userToDelete.id}`, {
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
    setIsSubmitting(true);
    const url = selectedUser ? `/api/owner/users/${selectedUser.id}` : '/api/owner/users';
    const method = selectedUser ? 'PUT' : 'POST';
    const body = selectedUser ? JSON.stringify(data) : JSON.stringify({ ...data, role: activeTab, schoolId });
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Toaster />
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/owner/schools')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-display font-bold">
          Manage School Users
        </h1>
      </div>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UserRole)}>
        <TabsList>
          {roles.map(role => (
            <TabsTrigger key={role} value={role}>{roleToTitle[role]}</TabsTrigger>
          ))}
        </TabsList>
        {roles.map(role => (
          <TabsContent key={role} value={role}>
            {isLoading ? (
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
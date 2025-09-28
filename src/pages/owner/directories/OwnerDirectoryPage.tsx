import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/data-table/DataTable';
import { columns } from '@/components/data-table/DataTableColumns';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { Row } from '@tanstack/react-table';
import { User } from '@/lib/types';
const mockStaff: User[] = [
  { id: '1', firstName: 'Lyra', lastName: 'Vega', email: 'teacher@aetheris.academy', role: 'teacher', createdAt: new Date(), updatedAt: new Date(), avatarUrl: null, hashedPassword: null },
  { id: '2', firstName: 'Orion', lastName: 'Stark', email: 'admin@aetheris.academy', role: 'school_admin', createdAt: new Date(), updatedAt: new Date(), avatarUrl: null, hashedPassword: null },
];
const mockStudents: User[] = [
  { id: '3', firstName: 'Leo', lastName: 'Minor', email: 'student@aetheris.academy', role: 'student', createdAt: new Date(), updatedAt: new Date(), avatarUrl: null, hashedPassword: null },
];
const mockPartners: User[] = [];
export function OwnerDirectoryPage() {
  const [activeTab, setActiveTab] = useState('staff');
  const handleAction = (action: string, row: Row<User>) => {
    toast.info(`${action} action for ${row.original.firstName}`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Toaster />
      <h1 className="text-3xl font-display font-bold mb-8">Directories</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>
        <TabsContent value="staff">
          <DataTable
            columns={columns}
            data={mockStaff}
            filterColumnId="email"
            filterPlaceholder="Filter staff by email..."
            onAddUser={() => toast.info('Add Staff action')}
            onEditRow={(row) => handleAction('Edit', row)}
            onDeleteRow={(row) => handleAction('Delete', row)}
          />
        </TabsContent>
        <TabsContent value="students">
          <DataTable
            columns={columns}
            data={mockStudents}
            filterColumnId="email"
            filterPlaceholder="Filter students by email..."
            onAddUser={() => toast.info('Add Student action')}
            onEditRow={(row) => handleAction('Edit', row)}
            onDeleteRow={(row) => handleAction('Delete', row)}
          />
        </TabsContent>
        <TabsContent value="partners">
          <DataTable
            columns={columns}
            data={mockPartners}
            filterColumnId="email"
            filterPlaceholder="Filter partners by email..."
            onAddUser={() => toast.info('Add Partner action')}
            onEditRow={(row) => handleAction('Edit', row)}
            onDeleteRow={(row) => handleAction('Delete', row)}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
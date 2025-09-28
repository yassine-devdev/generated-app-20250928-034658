import { ColumnDef, Row } from '@tanstack/react-table';
import { User } from '@/lib/types';
import { DataTableRowActions } from './DataTableRowActions';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role') as string;
      return <Badge variant="outline">{role.replace('_', ' ').toUpperCase()}</Badge>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Joined At',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string;
      return <span>{format(new Date(date), 'PP')}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      // Fix: Use explicit Row<User> type to avoid circular reference
      const meta = table.options.meta as { editRow: (row: Row<User>) => void; deleteRow: (row: Row<User>) => void; };
      return <DataTableRowActions row={row} onEdit={meta.editRow} onDelete={meta.deleteRow} />;
    },
  },
];
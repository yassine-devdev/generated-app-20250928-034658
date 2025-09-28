import { ColumnDef, Row } from '@tanstack/react-table';
import { format } from 'date-fns';
import { SchoolsListRowActions } from './SchoolsListRowActions';
type School = {
  id: string;
  name: string;
  createdAt: string;
};
export const columns: ColumnDef<School>[] = [
  {
    accessorKey: 'name',
    header: 'School Name',
  },
  {
    accessorKey: 'id',
    header: 'School ID',
  },
  {
    accessorKey: 'createdAt',
    header: 'Onboarded At',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string;
      return <span>{format(new Date(date), 'PP')}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options.meta as { editRow: (row: Row<School>) => void };
      return <SchoolsListRowActions row={row} onManageUsers={meta.editRow} />;
    },
  },
];
import { ColumnDef, Row } from '@tanstack/react-table';
import { ClassListRowActions } from './ClassListRowActions';
type Class = {
  id: string;
  name: string;
  teacher: string;
  students: number;
};
export const columns: ColumnDef<Class>[] = [
  {
    accessorKey: 'name',
    header: 'Class Name',
  },
  {
    accessorKey: 'teacher',
    header: 'Teacher',
  },
  {
    accessorKey: 'students',
    header: 'Enrolled Students',
    cell: ({ row }) => {
      const count = row.getValue('students') as number;
      return <div className="text-center">{count}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        editRow: (row: Row<Class>) => void;
        deleteRow: (row: Row<Class>) => void;
      };
      return <ClassListRowActions row={row} onEdit={meta.editRow} onDelete={meta.deleteRow} />;
    },
  },
];
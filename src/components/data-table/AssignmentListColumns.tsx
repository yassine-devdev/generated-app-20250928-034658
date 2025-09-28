import { ColumnDef, Row } from '@tanstack/react-table';
import { Assignment } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { AssignmentListRowActions } from './AssignmentListRowActions';
export const columns: ColumnDef<Assignment>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'courseName',
    header: 'Course',
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => {
      const date = row.getValue('dueDate') as string;
      return <span>{date ? format(new Date(date), 'PP') : 'N/A'}</span>;
    },
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const assignment = row.original;
      const graded = assignment.graded ?? 0;
      const submissions = assignment.submissions ?? 0;
      if (graded === submissions && submissions > 0) {
        return <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">All Graded</Badge>;
      }
      if (submissions > graded) {
        return <Badge variant="destructive">Needs Grading ({submissions - graded})</Badge>;
      }
      return <Badge variant="outline">Awaiting Submissions</Badge>;
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        gradeSubmissions: (row: Row<Assignment>) => void;
      };
      return <AssignmentListRowActions row={row} onGrade={meta.gradeSubmissions} />;
    },
  },
];
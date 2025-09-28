import { ColumnDef, Row } from '@tanstack/react-table';
import { KnowledgeBaseArticle } from '@/lib/types';
import { KnowledgeBaseRowActions } from './KnowledgeBaseRowActions';
import { format } from 'date-fns';
export const columns: ColumnDef<KnowledgeBaseArticle>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'content',
    header: 'Content Snippet',
    cell: ({ row }) => {
      const content = row.getValue('content') as string;
      return <p className="truncate max-w-xs text-muted-foreground">{content}</p>;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
    cell: ({ row }) => {
      const date = row.getValue('updatedAt') as string;
      return <span>{format(new Date(date), 'PPp')}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        editRow: (row: Row<KnowledgeBaseArticle>) => void;
        deleteRow: (row: Row<KnowledgeBaseArticle>) => void;
      };
      return <KnowledgeBaseRowActions row={row} onEdit={meta.editRow} onDelete={meta.deleteRow} />;
    },
  },
];
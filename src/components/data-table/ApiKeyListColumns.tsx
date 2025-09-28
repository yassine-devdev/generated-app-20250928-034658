import { ColumnDef, Row } from '@tanstack/react-table';
import { ApiKey } from '@/pages/owner/settings/OwnerApiKeysPage';
import { ApiKeyListRowActions } from './ApiKeyListRowActions';
import { format, formatDistanceToNow } from 'date-fns';
export const columns: ColumnDef<ApiKey>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'keyPrefix',
    header: 'Key Prefix',
    cell: ({ row }) => <span className="font-mono">{row.getValue('keyPrefix')}</span>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => format(row.getValue('createdAt'), 'PP'),
  },
  {
    accessorKey: 'lastUsed',
    header: 'Last Used',
    cell: ({ row }) => {
      const lastUsed = row.getValue('lastUsed') as Date | null;
      return lastUsed ? `${formatDistanceToNow(lastUsed)} ago` : 'Never';
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const meta = table.options.meta as { deleteRow: (row: Row<ApiKey>) => void };
      return <ApiKeyListRowActions row={row} onRevoke={meta.deleteRow} />;
    },
  },
];
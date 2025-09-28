import React from 'react';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
interface SchoolsListRowActionsProps<TData> {
  row: Row<TData>;
  onManageUsers: (row: Row<TData>) => void;
}
export function SchoolsListRowActions<TData>({
  row,
  onManageUsers,
}: SchoolsListRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onManageUsers(row)}>
          <Users className="mr-2 h-4 w-4" />
          Manage Users
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
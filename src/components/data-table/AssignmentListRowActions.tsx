import React from 'react';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
interface AssignmentListRowActionsProps<TData> {
  row: Row<TData>;
  onGrade: (row: Row<TData>) => void;
}
export function AssignmentListRowActions<TData>({
  row,
  onGrade,
}: AssignmentListRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onGrade(row)}>
          <Edit className="mr-2 h-4 w-4" />
          Grade Submissions
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
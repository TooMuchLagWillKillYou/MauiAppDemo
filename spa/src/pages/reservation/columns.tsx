'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { Reservation } from '@/types/reservation';
import type { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

const sortableHeader = (column: Column<Reservation>, title: string) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    className="cursor-pointer"
  >
    {title}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);
export const columns: ColumnDef<Reservation>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => sortableHeader(column, 'Name'),
  },
  {
    accessorKey: 'hour',
    header: ({ column }) => sortableHeader(column, 'Hour'),
  },
  {
    accessorKey: 'people',
    header: ({ column }) => sortableHeader(column, 'People'),
  },
  {
    accessorKey: 'table',
    header: ({ column }) => sortableHeader(column, 'Table'),
  },
  { accessorKey: 'notes', header: 'Notes' },
];

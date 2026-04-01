'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { Reservation } from '@/types/reservation';
import type { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import InputCell from './InputCell';
import CheckboxCell from './CheckboxCells';
import { ReservationStatus } from '@/types/ReservationStatus';
import SelectCell from './SelectCell';

const sortableHeader = (column: Column<Reservation>, title: string) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    className="has-[>svg]:px-0"
  >
    {title}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);
const columns: ColumnDef<Reservation>[] = [
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
      <CheckboxCell
        id={row.original.id}
        checked={row.original.status == ReservationStatus.Arrived}
        toggleRowSelection={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: { width: '3%' },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => sortableHeader(column, 'Name'),
    cell: (info) => <InputCell {...info} />,
    meta: { width: '20%' },
  },
  {
    id: 'hour',
    accessorFn: (row) => row.hour,
    header: ({ column }) => sortableHeader(column, 'Hour'),
    cell: (info) => <InputCell {...info} inputType="time" />,
    meta: { width: '10%' },
  },
  {
    accessorKey: 'people',
    header: ({ column }) => sortableHeader(column, 'People'),
    cell: (info) => <InputCell {...info} inputType="number" />,
    meta: { width: '10%' },
  },
  {
    accessorKey: 'table',
    header: ({ column }) => sortableHeader(column, 'Table'),
    cell: (info) => <SelectCell {...info} />,
    meta: { width: '10%' },
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: (info) => <InputCell {...info} />,
    meta: { width: '47%' },
  },
];

export { columns };

'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { Reservation } from '@/types/reservation';
import type { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { formatInTimeZone } from 'date-fns-tz';
import { parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

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
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: { width: '3%' },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => sortableHeader(column, 'Name'),
    meta: { width: '20%' },
  },
  {
    accessorKey: 'hour',
    header: ({ column }) => sortableHeader(column, 'Hour'),
    cell: ({ getValue }) => {
      const value = getValue() as string;
      if (!value) return '';
      return formatInTimeZone(parseISO(value), 'Europe/Rome', 'HH:mm');
    },
    meta: { width: '10%' },
  },
  {
    accessorKey: 'people',
    header: ({ column }) => sortableHeader(column, 'People'),
    meta: { width: '10%' },
  },
  {
    accessorKey: 'table',
    header: ({ column }) => sortableHeader(column, 'Table'),
    meta: { width: '10%' },
  },
  { accessorKey: 'notes', header: 'Notes', meta: { width: '47%' } },
];

const defaultColumn: Partial<ColumnDef<Reservation>> = {
  cell: ({ getValue }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const onBlur = () => console.log(value);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <Input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        variant="flat"
      />
    );
  },
};

export { columns, defaultColumn };

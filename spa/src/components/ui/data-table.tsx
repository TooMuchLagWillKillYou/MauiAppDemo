'use client';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  getFilteredRowModel,
  type RowSelectionState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { Input } from './input';
import { Spinner } from './spinner';
import type { TableData } from '@/types/TableData';

interface DataTableProps<TData extends TableData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  defaultSelectedRows: RowSelectionState;
}

export function DataTable<TData extends TableData, TValue>({
  columns,
  data,
  isLoading,
  defaultSelectedRows,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>(defaultSelectedRows);

  useEffect(() => {
    setRowSelection(defaultSelectedRows);
  }, [defaultSelectedRows]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => String(row.id),
    state: { sorting, columnFilters, rowSelection },
  });

  const renderBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24">
            <div className="flex items-center justify-center">
              <Spinner className="size-6" />
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (table.getRowModel().rows?.length) {
      return table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
          {row.getVisibleCells().map((cell) => {
            const width =
              (cell.column.columnDef.meta as { width?: string })?.width ??
              'auto';

            return (
              <TableCell key={cell.id} style={{ width }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            );
          })}
        </TableRow>
      ));
    }

    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="w-1/3"
        />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table className="w-full table-fixed">
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const width =
                    (header.column.columnDef.meta as { width?: string })
                      ?.width ?? 'auto';
                  return (
                    <TableHead key={header.id} style={{ width }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>{renderBody()}</TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredRowModel().rows.length -
            table.getFilteredSelectedRowModel().rows.length}{' '}
          table(s) remaining.
        </div>
      </div>
    </div>
  );
}

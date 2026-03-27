'use client';

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from '@/types/user';

import { getColumns } from './columns';

interface DataTableProps {
  data: User[];
  dict: any;
}

export function DataTable({ data, dict }: DataTableProps) {
  const columns = React.useMemo(() => getColumns(dict.columns), [dict.columns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20 shadow-xl backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
      <Table className="relative w-full">
        <TableHeader className="border-b border-white/10 bg-white/5">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-none hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="h-auto px-6 py-4 text-xs font-semibold tracking-wider text-slate-400 uppercase"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="group cursor-pointer border-b border-dashed border-white/5 transition-colors duration-200 hover:bg-white/5"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-6 py-4 font-medium text-slate-300 transition-colors duration-200 group-hover:text-white"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-48 text-center font-medium text-slate-500">
                {dict.page.noUsersFound}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

'use client';

import type { UsersDictionary } from './users-dictionary';

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { startTransition } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Locale } from '@/i18n-config';
import { User, UserRole } from '@/types/user';

import { getColumns } from './columns';

interface DataTableProps {
  data: User[];
  dict: UsersDictionary;
  locale: Locale;
  initialErrorMessage?: string | null;
}

export function DataTable({ data, dict, locale, initialErrorMessage = null }: DataTableProps) {
  const [users, setUsers] = React.useState<User[]>(data);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(initialErrorMessage);

  const handleUserRoleChange = (userId: number, nextRole: UserRole) => {
    startTransition(() => {
      setUsers((current) =>
        current.map((user) => (user.id === userId ? { ...user, role: nextRole } : user)),
      );
    });
  };

  const handleUserUpdated = (updatedUser: User) => {
    startTransition(() => {
      setUsers((current) =>
        current.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      );
    });
  };

  const columns = getColumns({
    dict: dict.columns,
    locale,
    onErrorMessageChange: setErrorMessage,
    onUserRoleChange: handleUserRoleChange,
    onUserUpdated: handleUserUpdated,
  });

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const emptyStateMessage =
    errorMessage && users.length === 0 ? errorMessage : dict.page.noUsersFound;

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20 shadow-xl backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
      {errorMessage ? (
        <div className="relative mx-4 my-4 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          {errorMessage}
        </div>
      ) : null}
      <div className="relative overflow-x-auto">
        <Table className="w-full min-w-[980px]">
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
                  className="group border-b border-dashed border-white/5 transition-colors duration-200 hover:bg-white/5"
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
                <TableCell
                  colSpan={columns.length}
                  className="h-48 text-center font-medium text-slate-500"
                >
                  {emptyStateMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

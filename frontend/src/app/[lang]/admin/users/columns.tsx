import { ColumnDef } from '@tanstack/react-table';
import { Shield, ShieldAlert, User as UserIcon } from 'lucide-react';

import { User } from '@/types/user';

export const getColumns = (d: any): ColumnDef<User>[] => [
  {
    accessorKey: 'id',
    header: d.id,
    cell: ({ row }) => (
      <div className="ml-1 font-mono text-xs text-slate-500">#{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: d.user,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 text-cyan-400">
            <UserIcon size={16} />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-white">{user.name}</span>
            <span className="max-w-[200px] truncate text-xs text-slate-500">{user.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: d.accessLevel,
    cell: ({ row }) => {
      const role = String(row.getValue('role')).toLowerCase();

      if (role === 'admin') {
        return (
          <div className="flex w-fit items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-bold tracking-wider text-red-400 uppercase">
            <ShieldAlert size={14} /> {d.admin}
          </div>
        );
      }

      if (role === 'moderator') {
        return (
          <div className="flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold tracking-wider text-emerald-400 uppercase">
            <Shield size={14} /> {d.mod}
          </div>
        );
      }

      return (
        <div className="flex w-fit items-center gap-1.5 rounded-full border border-slate-500/20 bg-slate-500/10 px-2.5 py-1 text-xs font-semibold tracking-wider text-slate-400">
          <UserIcon size={14} /> User
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: d.joinedDate,
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return (
        <div className="flex flex-col">
          <span className="text-sm text-slate-300">
            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-xs text-slate-500">
            {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      );
    },
  },
];

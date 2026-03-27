import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types/user"
import { Shield, ShieldAlert, User as UserIcon } from "lucide-react"

export const getColumns = (d: any): ColumnDef<User>[] => [
  {
    accessorKey: "id",
    header: d.id,
    cell: ({ row }) => <div className="text-slate-500 text-xs font-mono ml-1">#{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: d.user,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-white/10 flex items-center justify-center text-cyan-400">
            <UserIcon size={16} />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-white tracking-tight">{user.name}</span>
            <span className="text-xs text-slate-500 truncate max-w-[200px]">{user.email}</span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "role",
    header: d.accessLevel,
    cell: ({ row }) => {
      const role = String(row.getValue("role")).toLowerCase()
      
      if (role === 'admin') {
        return (
          <div className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert size={14} /> {d.admin}
          </div>
        )
      }
      
      if (role === 'moderator') {
        return (
          <div className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Shield size={14} /> {d.mod}
          </div>
        )
      }

      return (
        <div className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400 text-xs font-semibold tracking-wider">
          <UserIcon size={14} /> User
        </div>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: d.joinedDate,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return (
        <div className="flex flex-col">
          <span className="text-sm text-slate-300">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className="text-xs text-slate-500">{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      )
    }
  },
]

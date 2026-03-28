import type { UsersColumnsDictionary } from './users-dictionary';

import { ColumnDef } from '@tanstack/react-table';
import { BriefcaseBusiness, User as UserIcon } from 'lucide-react';

import { Locale } from '@/i18n-config';
import { PROJECT_TEAM_ROLE_VALUES, User, UserRole } from '@/types/user';

import { UserRoleDropdown } from './user-role-dropdown';

interface GetColumnsArgs {
  dict: UsersColumnsDictionary;
  locale: Locale;
  onErrorMessageChange: (message: string | null) => void;
  onUserRoleChange: (userId: number, nextRole: UserRole) => void;
  onUserUpdated: (user: User) => void;
}

const localeByLanguage: Record<Locale, string> = {
  en: 'en-US',
  uk: 'uk-UA',
};

function getProjectRoleLabel(
  role: (typeof PROJECT_TEAM_ROLE_VALUES)[number],
  dict: UsersColumnsDictionary,
): string {
  switch (role) {
    case 'project_owner':
      return dict.projectOwner;
    case 'project_creator':
      return dict.projectCreator;
    case 'project_manager':
      return dict.projectManager;
    case 'designer':
      return dict.designer;
    case 'developer':
      return dict.developer;
    case 'frontend_developer':
      return dict.frontendDeveloper;
    case 'backend_developer':
      return dict.backendDeveloper;
    case 'qa':
      return dict.qa;
    case 'marketer':
      return dict.marketer;
    case 'business_analyst':
      return dict.businessAnalyst;
  }
}

export const getColumns = ({
  dict,
  locale,
  onErrorMessageChange,
  onUserRoleChange,
  onUserUpdated,
}: GetColumnsArgs): ColumnDef<User>[] => [
  {
    accessorKey: 'id',
    header: dict.id,
    cell: ({ row }) => (
      <div className="ml-1 font-mono text-xs text-slate-500">#{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: dict.user,
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
    header: dict.accessLevel,
    cell: ({ row }) => (
      <UserRoleDropdown
        user={row.original}
        dict={dict}
        onErrorMessageChange={onErrorMessageChange}
        onUserRoleChange={onUserRoleChange}
        onUserUpdated={onUserUpdated}
      />
    ),
  },
  {
    accessorKey: 'projectRoles',
    header: dict.projectRoles,
    cell: ({ row }) => {
      const { projectRoles } = row.original;

      if (projectRoles.length === 0) {
        return (
          <span className="inline-flex items-center rounded-full border border-dashed border-white/10 px-3 py-1 text-xs font-medium text-slate-500">
            {dict.noProjectRoles}
          </span>
        );
      }

      return (
        <div className="flex max-w-[280px] flex-wrap gap-2 whitespace-normal">
          {projectRoles.map((role) => (
            <span
              key={`${row.original.id}-${role}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-200"
            >
              <BriefcaseBusiness size={12} className="text-emerald-300" />
              {getProjectRoleLabel(role, dict)}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: dict.joinedDate,
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;

      if (!createdAt) {
        return <span className="text-slate-500">-</span>;
      }

      return (
        <span className="text-sm text-slate-300">
          {new Intl.DateTimeFormat(localeByLanguage[locale], {
            dateStyle: 'medium',
          }).format(new Date(createdAt))}
        </span>
      );
    },
  },
];

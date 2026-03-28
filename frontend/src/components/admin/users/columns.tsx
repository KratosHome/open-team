import type { UsersColumnsDictionary } from './users-dictionary';

import { ColumnDef } from '@tanstack/react-table';
import {
  BriefcaseBusiness,
  ChevronDown,
  Crown,
  LoaderCircle,
  ShieldAlert,
  ShieldCheck,
  User as UserIcon,
  UserRoundX,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Locale } from '@/i18n-config';
import { cn } from '@/lib/utils';
import { PROJECT_TEAM_ROLE_VALUES, User, USER_ROLE_VALUES, UserRole } from '@/types/user';

interface GetColumnsArgs {
  dict: UsersColumnsDictionary;
  locale: Locale;
  pendingRoleIds: Set<number>;
  onRoleChange: (userId: number, nextRole: UserRole) => void;
}

interface UserRoleDropdownProps {
  user: User;
  dict: UsersColumnsDictionary;
  isSaving: boolean;
  onRoleChange: (userId: number, nextRole: UserRole) => void;
}

const localeByLanguage: Record<Locale, string> = {
  en: 'en-US',
  uk: 'uk-UA',
};

function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && USER_ROLE_VALUES.some((role) => role === value);
}

function getRoleLabel(role: UserRole, dict: UsersColumnsDictionary): string {
  switch (role) {
    case 'super_admin':
      return dict.superAdmin;
    case 'admin':
      return dict.admin;
    case 'unverified_user':
      return dict.unverifiedUser;
    case 'user':
      return dict.userRole;
  }
}

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

function getRoleTone(role: UserRole) {
  switch (role) {
    case 'super_admin':
      return {
        icon: Crown,
        badgeClassName:
          'border-rose-500/30 bg-rose-500/10 text-rose-200 hover:border-rose-400/40 hover:bg-rose-500/15',
        menuIconClassName: 'text-rose-300',
      };
    case 'admin':
      return {
        icon: ShieldAlert,
        badgeClassName:
          'border-amber-500/30 bg-amber-500/10 text-amber-100 hover:border-amber-400/40 hover:bg-amber-500/15',
        menuIconClassName: 'text-amber-300',
      };
    case 'unverified_user':
      return {
        icon: UserRoundX,
        badgeClassName:
          'border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-100 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/15',
        menuIconClassName: 'text-fuchsia-300',
      };
    case 'user':
      return {
        icon: ShieldCheck,
        badgeClassName:
          'border-cyan-500/25 bg-cyan-500/10 text-cyan-100 hover:border-cyan-400/40 hover:bg-cyan-500/15',
        menuIconClassName: 'text-cyan-300',
      };
  }
}

function UserRoleDropdown({ user, dict, isSaving, onRoleChange }: UserRoleDropdownProps) {
  const roleTone = getRoleTone(user.role);
  const RoleIcon = roleTone.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isSaving}
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'min-w-[180px] justify-between border-white/10 bg-white/5 px-3 text-left text-sm text-white shadow-none transition-colors',
              roleTone.badgeClassName,
            )}
          />
        }
      >
        <span className="flex items-center gap-2">
          <RoleIcon size={14} />
          <span>{getRoleLabel(user.role, dict)}</span>
        </span>
        {isSaving ? (
          <span className="flex items-center gap-2 text-xs opacity-80">
            <LoaderCircle className="size-3.5 animate-spin" />
            {dict.saving}
          </span>
        ) : (
          <ChevronDown size={14} className="opacity-70" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{dict.changeRole}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={user.role}
          onValueChange={(value) => {
            if (!isUserRole(value) || value === user.role) {
              return;
            }

            onRoleChange(user.id, value);
          }}
        >
          {USER_ROLE_VALUES.map((role) => {
            const nextRoleTone = getRoleTone(role);
            const NextRoleIcon = nextRoleTone.icon;

            return (
              <DropdownMenuRadioItem key={role} value={role} disabled={isSaving} closeOnClick>
                <span className="flex items-center gap-2">
                  <NextRoleIcon size={14} className={nextRoleTone.menuIconClassName} />
                  <span>{getRoleLabel(role, dict)}</span>
                </span>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const getColumns = ({
  dict,
  locale,
  pendingRoleIds,
  onRoleChange,
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
        isSaving={pendingRoleIds.has(row.original.id)}
        onRoleChange={onRoleChange}
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

'use client';

import type { UsersColumnsDictionary } from './users-dictionary';

import {
  ChevronDown,
  Crown,
  LoaderCircle,
  ShieldAlert,
  ShieldCheck,
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
import { cn } from '@/lib/utils';
import { User, UserRole, USER_ROLE_VALUES } from '@/types/user';

import { useUpdateUserRoleMutation } from './use-update-user-role-mutation';

interface UserRoleDropdownProps {
  user: User;
  dict: UsersColumnsDictionary;
  onErrorMessageChange: (message: string | null) => void;
  onUserRoleChange: (userId: number, nextRole: UserRole) => void;
  onUserUpdated: (user: User) => void;
}

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

export function UserRoleDropdown({
  user,
  dict,
  onErrorMessageChange,
  onUserRoleChange,
  onUserUpdated,
}: UserRoleDropdownProps) {
  const roleTone = getRoleTone(user.role);
  const RoleIcon = roleTone.icon;
  const { isPending, mutate } = useUpdateUserRoleMutation({
    user,
    onErrorMessageChange,
    onUserRoleChange,
    onUserUpdated,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isPending}
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
        {isPending ? (
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
            if (!isUserRole(value) || value === user.role || isPending) {
              return;
            }

            mutate(value);
          }}
        >
          {USER_ROLE_VALUES.map((role) => {
            const nextRoleTone = getRoleTone(role);
            const NextRoleIcon = nextRoleTone.icon;

            return (
              <DropdownMenuRadioItem key={role} value={role} disabled={isPending} closeOnClick>
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

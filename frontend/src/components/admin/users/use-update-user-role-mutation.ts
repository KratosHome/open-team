'use client';

import { useMutation } from '@tanstack/react-query';

import { updateUserRole } from '@/lib/mutations/update-user-role';
import { queryKeys } from '@/lib/queries/query-keys';
import { User, UserRole } from '@/types/user';

interface UseUpdateUserRoleMutationArgs {
  user: User;
  onErrorMessageChange: (message: string | null) => void;
  onUserRoleChange: (userId: number, nextRole: UserRole) => void;
  onUserUpdated: (user: User) => void;
}

export function useUpdateUserRoleMutation({
  user,
  onErrorMessageChange,
  onUserRoleChange,
  onUserUpdated,
}: UseUpdateUserRoleMutationArgs) {
  return useMutation<User, Error, UserRole, { previousRole: UserRole }>({
    mutationKey: queryKeys.users.updateRole(user.id),
    mutationFn: (nextRole) => updateUserRole(user.id, nextRole),
    onMutate: (nextRole) => {
      onErrorMessageChange(null);
      onUserRoleChange(user.id, nextRole);

      return { previousRole: user.role };
    },
    onSuccess: (updatedUser) => {
      onUserUpdated(updatedUser);
    },
    onError: (error, _nextRole, context) => {
      if (context) {
        onUserRoleChange(user.id, context.previousRole);
      }

      onErrorMessageChange(error.message);
    },
  });
}

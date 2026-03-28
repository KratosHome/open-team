const usersQueryKeys = {
  all: ['users'] as const,
  detail: (userId: number) => [...usersQueryKeys.all, 'detail', userId] as const,
  role: (userId: number) => [...usersQueryKeys.detail(userId), 'role'] as const,
  updateRole: (userId: number) => [...usersQueryKeys.role(userId), 'update'] as const,
};

export const queryKeys = {
  users: usersQueryKeys,
} as const;

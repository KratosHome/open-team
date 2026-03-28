export const USER_ROLE_VALUES = ['super_admin', 'admin', 'user', 'unverified_user'] as const;

export const PROJECT_TEAM_ROLE_VALUES = [
  'project_owner',
  'project_creator',
  'project_manager',
  'designer',
  'developer',
  'frontend_developer',
  'backend_developer',
  'qa',
  'marketer',
  'business_analyst',
] as const;

export type UserRole = (typeof USER_ROLE_VALUES)[number];
export type ProjectTeamRole = (typeof PROJECT_TEAM_ROLE_VALUES)[number];

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  projectRoles: ProjectTeamRole[];
  createdAt: string;
  updatedAt: string;
}

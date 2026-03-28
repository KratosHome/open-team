import type { UsersDictionary } from './users-dictionary';
import type { Locale } from '@/i18n-config';
import type { User } from '@/types/user';

export interface AdminUsersRouteParams {
  lang: string;
}

export interface AdminUsersPageProps {
  params: Promise<AdminUsersRouteParams>;
}

export interface UsersResult {
  data: User[];
  errorMessage: string | null;
}

export interface AdminUsersPageData {
  locale: Locale;
  usersDict: UsersDictionary;
  usersResult: UsersResult;
}

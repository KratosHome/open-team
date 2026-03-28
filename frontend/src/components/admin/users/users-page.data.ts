import 'server-only';

import type { UsersDictionary } from './users-dictionary';
import type { AdminUsersPageData, AdminUsersPageProps } from './users-page.types';
import type { Locale } from '@/i18n-config';
import type { User } from '@/types/user';

import { cache } from 'react';

import { fetchApiData } from '@/lib/fetch-api-data';
import { getDictionary } from '@/lib/get-dictionary';

const getUsersDictionary = cache(async (locale: Locale): Promise<UsersDictionary> => {
  return (await getDictionary(locale, 'users')) as UsersDictionary;
});

function normalizeUsers(payload: unknown): User[] {
  return Array.isArray(payload) ? (payload as User[]) : [];
}

export async function getAdminUsersPageData({
  params,
}: AdminUsersPageProps): Promise<AdminUsersPageData> {
  const { lang } = await params;
  const locale = lang as Locale;
  const usersDict = await getUsersDictionary(locale);
  const usersResult = await fetchApiData<User[]>('/users', {
    fallbackErrorMessage: usersDict.page.failedToLoadUsers,
    init: {
      cache: 'no-store',
    },
    transform: normalizeUsers,
  });

  return {
    locale,
    usersDict,
    usersResult: {
      data: usersResult.data ?? [],
      errorMessage: usersResult.errorMessage,
    },
  };
}

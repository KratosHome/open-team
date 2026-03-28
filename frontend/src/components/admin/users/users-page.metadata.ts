import 'server-only';

import type { UsersDictionary } from './users-dictionary';
import type { AdminUsersPageProps } from './users-page.types';
import type { Locale } from '@/i18n-config';
import type { Metadata } from 'next';

import { cache } from 'react';

import { getDictionary } from '@/lib/get-dictionary';

const getUsersDictionary = cache(async (locale: Locale): Promise<UsersDictionary> => {
  return (await getDictionary(locale, 'users')) as UsersDictionary;
});

export async function generateAdminUsersMetadata({
  params,
}: AdminUsersPageProps): Promise<Metadata> {
  const { lang } = await params;
  const usersDict = await getUsersDictionary(lang as Locale);
  const d = usersDict.page;

  return {
    title: `${d.title} ${d.titleHighlight}`,
    description: d.description,
  };
}

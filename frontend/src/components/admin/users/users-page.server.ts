import 'server-only';

import type { UsersDictionary } from './users-dictionary';
import type { ErrorMessagePayload } from '@/lib/extract-error-message';
import type { Metadata } from 'next';

import { Locale } from '@/i18n-config';
import { extractErrorMessage } from '@/lib/extract-error-message';
import { getApiBaseUrl } from '@/lib/get-api-base-url';
import { getDictionary } from '@/lib/get-dictionary';
import { User } from '@/types/user';

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

export async function getUsers(fallbackErrorMessage: string): Promise<UsersResult> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/users`, {
      cache: 'no-store',
    });
    const payload = (await res.json().catch(() => null)) as User[] | ErrorMessagePayload | null;

    if (!res.ok) {
      console.error('Failed to fetch users', res.status);
      return {
        data: [],
        errorMessage: extractErrorMessage(
          payload as ErrorMessagePayload | null,
          fallbackErrorMessage,
        ),
      };
    }

    return {
      data: Array.isArray(payload) ? payload : [],
      errorMessage: null,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      data: [],
      errorMessage: fallbackErrorMessage,
    };
  }
}

export async function generateAdminUsersMetadata({
  params,
}: AdminUsersPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const usersDict = (await getDictionary(locale, 'users')) as UsersDictionary;
  const d = usersDict.page;

  return {
    title: `${d.title} ${d.titleHighlight}`,
    description: d.description,
  };
}

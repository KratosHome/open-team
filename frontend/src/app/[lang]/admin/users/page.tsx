import type { UsersDictionary } from '@/components/admin/users/users-dictionary';

import { DataTable } from '@/components/admin/users/data-table';
import { Locale } from '@/i18n-config';
import { getApiBaseUrl } from '@/lib/get-api-base-url';
import { getDictionary } from '@/lib/get-dictionary';
import { User } from '@/types/user';

type ErrorPayload = {
  message?: string | string[];
};

type UsersResult = {
  data: User[];
  errorMessage: string | null;
};

function extractErrorMessage(payload: ErrorPayload | null, fallback: string): string {
  if (!payload?.message) {
    return fallback;
  }

  return Array.isArray(payload.message) ? payload.message.join(', ') : payload.message;
}

async function getUsers(
  apiBaseUrl: string,
  fallbackErrorMessage: string,
): Promise<UsersResult> {
  try {
    const res = await fetch(`${apiBaseUrl}/users`, {
      cache: 'no-store',
    });
    const payload = (await res.json().catch(() => null)) as User[] | ErrorPayload | null;

    if (!res.ok) {
      console.error('Failed to fetch users', res.status);
      return {
        data: [],
        errorMessage: extractErrorMessage(payload as ErrorPayload | null, fallbackErrorMessage),
      };
    }

    return {
      data: (payload as User[] | null) ?? [],
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

export default async function AdminUsersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const usersDict = (await getDictionary(locale, 'users')) as UsersDictionary;
  const d = usersDict.page;
  const apiBaseUrl = getApiBaseUrl();

  const { data, errorMessage } = await getUsers(apiBaseUrl, d.failedToLoadUsers);

  return (
    <div className="w-full">
      <div className="animate-hero-left mb-10">
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          {d.title} <span className="text-gradient-cyan">{d.titleHighlight}</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-400">{d.description}</p>
      </div>

      <div className="glass animate-hero-up animation-delay-200 rounded-2xl border border-white/10 p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{d.directory}</h2>
          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium tracking-wide text-cyan-400">
            {d.totalUsers.replace('{count}', String(data.length))}
          </div>
        </div>
        <DataTable data={data} dict={usersDict} locale={locale} initialErrorMessage={errorMessage} />
      </div>
    </div>
  );
}

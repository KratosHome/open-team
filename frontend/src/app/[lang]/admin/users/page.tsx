import type { UsersDictionary } from '@/components/admin/users/users-dictionary';
import type { AdminUsersPageProps } from '@/components/admin/users/users-page.server';
import type { Metadata } from 'next';

import { DataTable } from '@/components/admin/users/data-table';
import { generateAdminUsersMetadata, getUsers } from '@/components/admin/users/users-page.server';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

export async function generateMetadata(props: AdminUsersPageProps): Promise<Metadata> {
  return generateAdminUsersMetadata(props);
}

export default async function AdminUsersPage({ params }: AdminUsersPageProps) {
  const { lang } = await params;
  const locale = lang as Locale;
  const usersDict = (await getDictionary(locale, 'users')) as UsersDictionary;
  const d = usersDict.page;

  const { data, errorMessage } = await getUsers(d.failedToLoadUsers);

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
        <DataTable
          data={data}
          dict={usersDict}
          locale={locale}
          initialErrorMessage={errorMessage}
        />
      </div>
    </div>
  );
}

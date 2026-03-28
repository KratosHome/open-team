import type { AdminUsersPageProps } from '@/components/admin/users/users-page.types';

import { DataTable } from '@/components/admin/users/data-table';
import { AdminUsersPageHeader } from '@/components/admin/users/users-page-header';
import { getAdminUsersPageData } from '@/components/admin/users/users-page.data';
import { generateAdminUsersMetadata } from '@/components/admin/users/users-page.metadata';

export async function generateMetadata(props: AdminUsersPageProps) {
  return generateAdminUsersMetadata(props);
}

export default async function AdminUsersPage(props: AdminUsersPageProps) {
  const { locale, usersDict, usersResult } = await getAdminUsersPageData(props);
  const { data, errorMessage } = usersResult;
  const d = usersDict.page;

  return (
    <div className="w-full">
      <AdminUsersPageHeader dict={d} />

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
          initialErrorMessage={errorMessage}
          locale={locale}
        />
      </div>
    </div>
  );
}

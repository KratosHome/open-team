import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';
import { User } from "@/types/user"
import { DataTable } from "./data-table"

async function getUsers(): Promise<User[]> {
  try {
    const apiUrl = process.env.DEFAULT_API_URL || 'http://localhost:29465';
    const res = await fetch(`${apiUrl}/users`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      console.error("Failed to fetch users", res.status);
      return [];
    }

    const data: User[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export default async function AdminUsersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const usersDict = await getDictionary(locale, 'users');
  const d = usersDict.page;

  const data = await getUsers();

  return (
    <div className="w-full">
      <div className="mb-10 animate-hero-left">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          {d.title} <span className="text-gradient-cyan">{d.titleHighlight}</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          {d.description}
        </p>
      </div>
      
      <div className="glass rounded-2xl border border-white/10 p-6 md:p-8 animate-hero-up animation-delay-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">{d.directory}</h2>
          <div className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-medium tracking-wide">
            {d.totalUsers.replace('{count}', String(data.length))}
          </div>
        </div>
        <DataTable data={data} dict={usersDict} />
      </div>
    </div>
  )
}

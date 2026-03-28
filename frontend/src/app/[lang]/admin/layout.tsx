import Link from 'next/link';
import { FileText, LayoutDashboard, LogOut, Settings, Users } from 'lucide-react';
import React from 'react';

import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const adminDict = await getDictionary(locale, 'admin');

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#0c0e14] pt-18 text-slate-50">
      {/* Background Glows */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-cyan-900/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-emerald-900/20 blur-[120px]" />

      {/* Sidebar */}
      <aside className="glass z-10 hidden w-72 flex-col border-r border-white/5 p-6 md:flex">
        <div className="mb-4 ml-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
          {adminDict.management}
        </div>

        <nav className="relative flex-1 space-y-2">
          <Link
            href={`/${lang}/admin/users`}
            className="group relative flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
          >
            <Users size={20} className="transition-colors group-hover:text-cyan-400" />
            <span className="font-medium">{adminDict.users}</span>
          </Link>
          <Link
            href={`/${lang}/admin/blog`}
            className="group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
          >
            <FileText size={20} className="transition-colors group-hover:text-emerald-400" />
            <span className="font-medium">{adminDict.blogPosts}</span>
          </Link>
          <Link
            href={`/${lang}/admin/analytics`}
            className="group flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-slate-500 transition-all duration-300 hover:bg-white/5 hover:text-slate-300"
          >
            <LayoutDashboard size={20} className="transition-colors group-hover:text-slate-400" />
            <span className="font-medium">{adminDict.analytics}</span>
          </Link>
          <Link
            href={`/${lang}/admin/settings`}
            className="group flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-slate-500 transition-all duration-300 hover:bg-white/5 hover:text-slate-300"
          >
            <Settings size={20} className="transition-colors group-hover:text-slate-400" />
            <span className="font-medium">{adminDict.settings}</span>
          </Link>
        </nav>

        <div className="mt-auto border-t border-white/5 pt-6">
          <Link
            href={`/${lang}`}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={20} />
            <span className="font-medium">{adminDict.exitAdmin}</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 w-full flex-1 overflow-y-auto p-6 md:p-10 lg:p-12">
        <div className="animate-hero-up animation-delay-100 mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}

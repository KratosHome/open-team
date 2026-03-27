import React from 'react';
import Link from 'next/link';
import { Users, FileText, LayoutDashboard, Settings, LogOut } from 'lucide-react';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <div className="flex min-h-screen bg-[#0c0e14] text-slate-50 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/20 blur-[120px] pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-72 glass border-r border-white/5 p-6 hidden md:flex flex-col z-10">
        <div className="mb-10">
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              O
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              OpenTeam
            </h2>
          </Link>
        </div>
        
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 ml-1">
          Management
        </div>
        
        <nav className="space-y-2 flex-1 relative">
          <Link
            href={`/${lang}/admin/users`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300 group relative"
          >
            <Users size={20} className="group-hover:text-cyan-400 transition-colors" />
            <span className="font-medium">Users</span>
          </Link>
          <Link
            href={`/${lang}/admin/blog`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300 group"
          >
            <FileText size={20} className="group-hover:text-emerald-400 transition-colors" />
            <span className="font-medium">Blog Posts</span>
          </Link>
          <Link
            href={`/${lang}/admin/analytics`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-300 cursor-not-allowed group"
          >
            <LayoutDashboard size={20} className="group-hover:text-slate-400 transition-colors" />
            <span className="font-medium">Analytics (Soon)</span>
          </Link>
          <Link
            href={`/${lang}/admin/settings`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-300 cursor-not-allowed group"
          >
            <Settings size={20} className="group-hover:text-slate-400 transition-colors" />
            <span className="font-medium">Settings (Soon)</span>
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <Link
            href={`/${lang}`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
          >
            <LogOut size={20} />
            <span className="font-medium">Exit Admin</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 z-10 relative overflow-y-auto w-full">
        <div className="max-w-7xl mx-auto animate-hero-up animation-delay-100">
          {children}
        </div>
      </main>
    </div>
  );
}

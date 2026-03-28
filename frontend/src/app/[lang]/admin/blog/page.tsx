import type { Locale } from '@/i18n-config';

import { PenLine } from 'lucide-react';

import { getDictionary } from '@/lib/get-dictionary';

interface LangParams {
  lang: string;
}

interface AdminBlogPageProps {
  params: Promise<LangParams>;
}

export default async function AdminBlogPage({
  params,
}: AdminBlogPageProps) {
  const { lang } = await params;
  const locale = lang as Locale;
  const blogDict = await getDictionary(locale, 'blog');
  const d = blogDict.page;

  return (
    <div className="w-full">
      <div className="mb-10 flex animate-hero-left flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            {d.title} <span className="text-gradient-cyan">{d.titleHighlight}</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-400">{d.description}</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:from-cyan-400 hover:to-emerald-400 active:scale-95">
          <PenLine size={18} />
          <span>{d.newArticle}</span>
        </button>
      </div>

      <div className="group glass animation-delay-200 relative flex min-h-[400px] animate-hero-up flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 p-12 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-inner transition-transform duration-500 group-hover:scale-110">
          <PenLine
            size={32}
            className="text-slate-400 transition-colors duration-500 group-hover:text-cyan-400"
          />
        </div>

        <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">{d.emptyStateTitle}</h3>
        <p className="max-w-md text-center leading-relaxed text-slate-400">{d.emptyStateDesc}</p>
      </div>
    </div>
  );
}

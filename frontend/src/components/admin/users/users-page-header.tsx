import type { UsersPageDictionary } from './users-dictionary';

interface AdminUsersPageHeaderProps {
  dict: UsersPageDictionary;
}

export function AdminUsersPageHeader({ dict }: AdminUsersPageHeaderProps) {
  return (
    <div className="animate-hero-left mb-10">
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
        {dict.title} <span className="text-gradient-cyan">{dict.titleHighlight}</span>
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-slate-400">{dict.description}</p>
    </div>
  );
}

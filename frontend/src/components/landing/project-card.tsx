'use client';

import type { ProjectCardProps } from '@/types/projects';

import { ArrowRight, Calendar, Clock, TrendingUp, Users, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ProjectCard({ project, dict }: ProjectCardProps) {
  const progressPercent = (project.funding.current / project.funding.target) * 100;

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300',
        'border-t-3 border-emerald-500/30 border-t-emerald-400/80 bg-[#161922]/40 backdrop-blur-xl hover:border-blue-500/40 hover:border-t-blue-400/90 hover:shadow-2xl hover:shadow-blue-950/30',
      )}
    >
      <div className="flex flex-grow flex-col space-y-6 p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-bold tracking-tight text-white">{project.title}</h3>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {project.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400 transition-colors group-hover:bg-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-slate-400">{project.description}</p>

        <div className="flex flex-wrap gap-3">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="h-px bg-white/5" />

        <div className="space-y-3">
          <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            {dict.seekingRolesTitle}
          </h4>
          <div className="space-y-2">
            {project.seekingRoles.map((role) => (
              <div key={role.title} className="group/role flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300 transition-colors group-hover/role:text-white">
                  {role.title}
                </span>
                <span className="text-sm font-bold text-blue-400">
                  {role.rate.toLocaleString()} <span className="text-[10px] opacity-70">₴</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-emerald-400">
              <span className="text-emerald-400">
                {project.funding.current.toLocaleString()} /{' '}
                {project.funding.target.toLocaleString()}{' '}
                <span className="text-[10px] opacity-70">₴</span>
              </span>
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <span className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400">
            <TrendingUp size={12} />
            {project.badges.type}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
            <Zap size={12} />
            {project.badges.complexity}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-bold text-slate-400">
            <Calendar size={12} />
            {project.badges.deadline}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-y-2 pt-2">
          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
            <Clock size={12} className="text-slate-400" />
            Закінчується через {project.stats.daysLeft} днів
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
            <Users size={12} className="text-slate-400" />
            {project.stats.openRoles} відкр. ролі
          </div>
        </div>

        <div className="flex -space-x-2 pt-2">
          {project.team.map((member) => (
            <div
              key={member.id}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#161922] text-[10px] font-bold text-white',
                member.color,
              )}
            >
              {member.initials}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 pt-0">
        <Button variant="success" className="w-full">
          {dict.join}
          <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}

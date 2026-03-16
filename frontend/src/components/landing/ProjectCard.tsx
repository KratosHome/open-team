'use client';

import { LucideIcon, Zap, Clock, Users, Calendar, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { Project } from '@/data/projects';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const progressPercent = (project.funding.current / project.funding.target) * 100;

  return (
    <div className={cn(
      "group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300",
      "bg-[#161922]/40 backdrop-blur-xl border-white/5 hover:border-white/10 hover:shadow-2xl hover:shadow-black/40",
      project.accentColor ? project.accentColor : "border-emerald-500/30"
    )}>
      {/* Accent Glow at Top */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r transition-opacity duration-300",
        project.accentColor === 'border-emerald-500' ? "from-emerald-500/50 to-cyan-500/50" : "from-purple-500/50 to-pink-500/50"
      )} />

      <div className="flex flex-col p-6 space-y-6 flex-grow">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {project.status}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-slate-400 text-xs font-medium border border-white/5 transition-colors group-hover:bg-white/10">
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-slate-400 leading-relaxed text-sm line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-3">
          {project.techStack.map((tech) => (
            <span key={tech} className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
              {tech}
            </span>
          ))}
        </div>

        <div className="h-px bg-white/5" />

        {/* Seeking Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Шукають у команду</h4>
          <div className="space-y-2">
            {project.seekingRoles.map((role) => (
              <div key={role.title} className="flex items-center justify-between group/role">
                <span className="text-sm font-medium text-slate-300 transition-colors group-hover/role:text-white">{role.title}</span>
                <span className="text-sm font-bold text-blue-400">
                  {role.rate.toLocaleString()} <span className="text-[10px] opacity-70">₴</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Funding Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-emerald-400">
              {project.funding.current.toLocaleString()} / {project.funding.target.toLocaleString()} <span className="text-[10px] opacity-70">₴</span>
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
            <TrendingUp size={12} />
            {project.badges.type}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold border border-orange-500/20">
            <Zap size={12} />
            {project.badges.complexity}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-slate-400 text-xs font-bold border border-white/5">
            <Calendar size={12} />
            {project.badges.deadline}
          </span>
        </div>

        {/* Footer info breakdown */}
        <div className="grid grid-cols-2 gap-y-2 pt-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
            <Clock size={12} className="text-slate-400" />
            Закінчується через {project.stats.daysLeft} днів
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
            <Users size={12} className="text-slate-400" />
            {project.stats.openRoles} відкр. ролі
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
            <Clock size={12} className="text-slate-400" />
            ~{project.stats.hoursPerWeek} год/тиж
          </div>
        </div>

        {/* Team Avatars */}
        <div className="flex -space-x-2 pt-2">
          {project.team.map((member) => (
            <div 
              key={member.id}
              className={cn(
                "w-8 h-8 rounded-full border-2 border-[#161922] flex items-center justify-center text-[10px] font-bold text-white",
                member.color
              )}
            >
              {member.initials}
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4 pt-0">
        <Button className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-[#0c0e14] font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] group/btn">
          Приєднатись
          <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}

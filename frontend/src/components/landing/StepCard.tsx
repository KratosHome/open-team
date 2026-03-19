import { MyLink } from '@/components/ui/my-link';
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  number: string;
  icon: LucideIcon | React.ElementType;
  title: string;
  description: string;
  color: string;
  linkHref?: string;
  linkLabel?: string;
}

export const StepCard = ({
  number,
  icon: Icon,
  title,
  description,
  color,
  linkHref,
  linkLabel,
}: StepCardProps) => (
  <div
    className="glass group relative flex flex-col items-start gap-6 rounded-[32px] border-t-2 p-8 transition-all duration-300 hover:bg-white/5 active:scale-[0.98]"
    style={{ borderTopColor: color }}
  >
    {/* Glow effect */}
    <div 
      className="absolute -top-4 left-1/2 -z-10 h-32 w-32 -translate-x-1/2 rounded-full opacity-20 blur-[40px] transition-opacity group-hover:opacity-30"
      style={{ backgroundColor: color }}
    />

    <div
      className="inline-flex items-center justify-center rounded-lg px-3 py-1 text-[10px] font-black tracking-widest uppercase opacity-40"
      style={{ backgroundColor: `${color}15`, color }}
    >
      {number}
    </div>

    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div 
        className="relative flex h-20 w-20 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
        style={{ 
          backgroundColor: `${color}15`,
          boxShadow: `0 0 30px ${color}10`
        }}
      >
        <Icon className="h-10 w-10 drop-shadow-lg" style={{ color }} />
        {/* Inner glow */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-50 blur-xl"
          style={{ backgroundColor: color }}
        />
      </div>
      
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold tracking-tight text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
          {description}
        </p>
        {linkHref && linkLabel ? (
          <MyLink
            href={linkHref}
            className="text-sm font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-emerald-300"
          >
            {linkLabel}
          </MyLink>
        ) : null}
      </div>
    </div>
  </div>
);

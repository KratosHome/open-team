import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  number: string;
  icon: LucideIcon | React.ElementType;
  title: string;
  description: string;
  color: string;
}

export const StepCard = ({
  number,
  icon: Icon,
  title,
  description,
  color,
}: StepCardProps) => (
  <div
    className="glass group relative flex flex-col items-start gap-4 rounded-[32px] border-t-2 p-8 transition-all duration-300 hover:bg-white/5"
    style={{ borderTopColor: color }}
  >
    <div
      className="inline-flex items-center justify-center rounded-lg px-3 py-1 text-xs font-bold"
      style={{ backgroundColor: `${color}15`, color }}
    >
      {number}
    </div>

    <div className="flex flex-col items-start gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl">
        <Icon className="h-10 w-10" style={{ color }} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-white/40">{description}</p>
      </div>
    </div>
  </div>
);

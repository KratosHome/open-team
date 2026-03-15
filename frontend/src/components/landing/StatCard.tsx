import React from 'react';

interface StatCardProps {
  value: string;
  sublabel: string;
}

export const StatCard = ({ value, sublabel }: StatCardProps) => (
  <div className="glass flex min-w-[130px] flex-col gap-1 rounded-2xl px-8 py-6">
    <span className="text-4xl font-bold">{value}</span>
    <span className="text-sm text-white/40">{sublabel}</span>
  </div>
);

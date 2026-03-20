import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  showText = true,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8 text-lg',
    md: 'h-10 w-10 text-xl',
    lg: 'h-12 w-12 text-2xl'
  };

  const dotSizes = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4'
  };

  return (
    <div className={cn("flex items-center gap-3", className)} aria-label="TeamHub Logo">
      <div className="relative">
        {/* Outer subtle glow/circle as seen in the image */}
        <div className={cn(
          "absolute -inset-1 rounded-2xl bg-white/5 opacity-50 blur-[2px]",
          size === 'sm' && '-inset-0.5'
        )} />
        
        {/* Main Logo Container */}
        <div className={cn(
          "relative flex items-center justify-center rounded-xl border-2 border-[#57b9ff] bg-[#1a1c20]",
          sizeClasses[size]
        )}>
          <span className="font-bold text-[#57b9ff]">
            T
          </span>
          
          {/* Purple Dot */}
          <div className={cn(
            "absolute -right-1 -bottom-1 rounded-full bg-[#8b5cf6]",
            dotSizes[size]
          )} />
        </div>
      </div>
      
      {showText && (
        <div className="flex text-xl font-bold tracking-tight">
          <span className="text-white">Team</span>
          <span className="text-[#57b9ff]">Hub</span>
        </div>
      )}
    </div>
  );
};

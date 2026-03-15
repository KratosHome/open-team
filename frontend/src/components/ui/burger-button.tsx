import React from 'react';

import { cn } from '@/lib/utils';

interface BurgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const BurgerButton = ({ isOpen, onClick, className }: BurgerButtonProps) => {
  return (
    <button
      className={cn(
        'group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/5 hover:text-white',
        className,
      )}
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <div className="relative h-6 w-6">
        <span
          className={cn(
            'absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out',
            isOpen ? 'top-3 rotate-45' : 'top-1',
          )}
        />
        <span
          className={cn(
            'absolute top-3 left-0 block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out',
            isOpen ? 'opacity-0' : 'opacity-100',
          )}
        />
        <span
          className={cn(
            'absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out',
            isOpen ? 'top-3 -rotate-45' : 'top-5',
          )}
        />
      </div>
    </button>
  );
};

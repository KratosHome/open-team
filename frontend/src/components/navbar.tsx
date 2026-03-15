import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#1a1c20]">
            <span className="from-brand-green to-brand-purple bg-gradient-to-br bg-clip-text text-xl font-bold text-transparent">
              T
            </span>
          </div>
          <span className="text-xl font-bold tracking-tight">TeamHub</span>
        </div>

        <div className="hidden items-center gap-8 text-sm font-medium text-white/60 md:flex">
          <Link
            href="#"
            className="border-brand-green mt-1 border-b-2 pb-1 text-white transition-colors"
          >
            Проєкти
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Ком'юніті
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Блог
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Правила
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            FAQ
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Документація
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Токеноміка
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline">
            <span>🇺🇦 UA</span>
            <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
          </Button>
          <Button>
            Вхід <MoveRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

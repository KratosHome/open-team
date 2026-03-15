import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import React from 'react';

import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 bg-[#171724]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <Logo />
        </Link>

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

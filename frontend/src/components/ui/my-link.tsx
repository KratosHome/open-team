import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const myLinkVariants = cva('transition-colors', {
  variants: {
    variant: {
      default: 'text-primary hover:underline underline-offset-4',
      navbar: 'text-white/60 hover:text-white',
      'navbar-active': 'border-brand-green mt-1 border-b-2 pb-1 text-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface MyLinkProps extends ComponentProps<typeof Link>, VariantProps<typeof myLinkVariants> {}

export function MyLink({ className, variant, ...props }: MyLinkProps) {
  return <Link className={cn(myLinkVariants({ variant, className }))} {...props} />;
}

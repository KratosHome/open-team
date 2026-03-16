'use client';

import type { VariantProps } from 'class-variance-authority';

import { Button as ButtonPrimitive } from '@base-ui/react/button';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'group/button inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap border border-transparent bg-clip-padding font-medium transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
  {
    variants: {
      variant: {
        default: 'bg-[#6640D9] text-white hover:bg-[#5B36C7] hover:text-gray-100',
        outline:
          'border-[#3D3D57] bg-[#212133] text-white hover:border-[#54547A] hover:bg-[#2C2C46] hover:text-white aria-expanded:border-[#6B6BA6] aria-expanded:bg-[#343456] aria-expanded:text-white',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
        success: 'bg-[#00e99f] text-black hover:bg-[#00e99f]/90 hover:scale-[1.02]',
      },
      size: {
        default:
          'h-10 gap-1.5 rounded-lg px-2.5 text-sm has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: 'h-6 gap-1 rounded-[10px] px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*=size-])]:size-3',
        sm: 'h-7 gap-1 rounded-[12px] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*=size-])]:size-3.5',
        lg: 'h-9 gap-1.5 rounded-lg px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        xl: 'h-16 gap-2 rounded-2xl px-8 text-lg font-bold [&_svg:not([class*=size-])]:size-5',
        icon: 'size-8 rounded-lg',
        'icon-xs': 'size-6 rounded-[10px] [&_svg:not([class*=size-])]:size-3',
        'icon-sm': 'size-7 rounded-[12px]',
        'icon-lg': 'size-9 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };

'use client';

import * as React from 'react';
import { m } from 'framer-motion';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

type HeaderProps = React.ComponentProps<'header'> & {
  fixed?: boolean;
};

export function Header({ className, fixed, children, ...props }: HeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!fixed) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [fixed]);

  return (
    <header
      ref={headerRef}
      className={cn(
        'flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-4 lg:px-6',
        fixed && 'sticky top-0 z-20',
        fixed && scrolled && 'shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/90',
        className
      )}
      {...props}
    >
      <m.div
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="flex w-full items-center gap-2"
      >
        <SidebarTrigger className="-ms-1" />
        <Separator orientation="vertical" className="mr-1 h-4" />
        {children}
      </m.div>
    </header>
  );
}

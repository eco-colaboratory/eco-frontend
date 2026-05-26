'use client';

import { m, useReducedMotion } from 'framer-motion';

import { adminFadeUp, adminTransition } from '@/lib/admin/motion';
import { cn } from '@/lib/utils';

export function AdminFadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <m.div
      initial={reduced ? false : adminFadeUp.initial}
      animate={adminFadeUp.animate}
      transition={{ ...adminTransition(reduced, 0.32), delay: reduced ? 0 : delay }}
      className={cn(className)}
    >
      {children}
    </m.div>
  );
}

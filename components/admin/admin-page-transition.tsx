'use client';

import { m, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { adminDuration, adminPageTransition, adminTransition } from '@/lib/admin/motion';

export function AdminPageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <m.div
      key={pathname}
      data-admin-page
      initial={reduced ? false : adminPageTransition.initial}
      animate={adminPageTransition.animate}
      transition={adminTransition(reduced, adminDuration.base)}
      className="flex flex-1 flex-col"
    >
      {children}
    </m.div>
  );
}

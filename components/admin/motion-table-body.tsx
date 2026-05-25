'use client';

import { m, useReducedMotion } from 'framer-motion';

import { adminStaggerContainer } from '@/lib/admin/motion';

export function MotionTableBody({
  children,
  motionKey,
}: {
  children: React.ReactNode;
  /** Re-run stagger when page/filter changes */
  motionKey?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <tbody key={motionKey}>{children}</tbody>;
  }

  return (
    <m.tbody
      key={motionKey}
      variants={adminStaggerContainer}
      initial="hidden"
      animate="show"
    >
      {children}
    </m.tbody>
  );
}

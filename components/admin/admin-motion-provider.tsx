'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

export function AdminMotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

'use client';

import { AdminFadeIn } from '@/components/admin/admin-fade-in';
import { cn } from '@/lib/utils';

export function DataTableShell({
  children,
  className,
  delay = 0.06,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <AdminFadeIn delay={delay}>
      <div
        className={cn(
          'overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-shadow duration-300 hover:shadow-md',
          className
        )}
      >
        {children}
      </div>
    </AdminFadeIn>
  );
}

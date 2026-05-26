import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { DashboardPage } from './components/dashboard-page';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Page() {
  return (
    <Suspense fallback={<AdminTableSkeleton />}>
      <DashboardPage />
    </Suspense>
  );
}

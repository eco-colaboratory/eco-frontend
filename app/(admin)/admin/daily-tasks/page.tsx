import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { DailyTasksPage } from './components/daily-tasks-page';

export const metadata: Metadata = {
  title: 'Cấu hình Nhiệm vụ',
};

export default function Page() {
  return (
    <Suspense fallback={<AdminTableSkeleton />}>
      <DailyTasksPage />
    </Suspense>
  );
}

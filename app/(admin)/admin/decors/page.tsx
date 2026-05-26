import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { DecorsPage } from './components/decors-page';

export const metadata: Metadata = {
  title: 'Decors',
};

export default function Page() {
  return (
    <Suspense fallback={<AdminTableSkeleton />}>
      <DecorsPage />
    </Suspense>
  );
}

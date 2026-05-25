import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { SynergiesPage } from './components/synergies-page';

export const metadata: Metadata = {
  title: 'Synergies',
};

export default function Page() {
  return (
    <Suspense fallback={<AdminTableSkeleton />}>
      <SynergiesPage />
    </Suspense>
  );
}

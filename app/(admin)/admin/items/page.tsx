import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { ItemsPage } from './components/items-page';

export const metadata: Metadata = {
  title: 'Items',
};

export default function Page() {
  return (
    <Suspense fallback={<AdminTableSkeleton />}>
      <ItemsPage />
    </Suspense>
  );
}

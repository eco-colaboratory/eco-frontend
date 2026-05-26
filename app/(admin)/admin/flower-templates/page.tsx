import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { FlowerTemplatesPage } from './components/flower-templates-page';

export const metadata: Metadata = {
  title: 'Flower Templates',
};

export default function Page() {
  return (
    <Suspense fallback={<AdminTableSkeleton />}>
      <FlowerTemplatesPage />
    </Suspense>
  );
}

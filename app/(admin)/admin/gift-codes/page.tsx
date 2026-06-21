import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { GiftCodesPage } from './components/gift-codes-page';

export const metadata: Metadata = {
  title: 'Gift Codes',
};

export default function Page() {
  return (
    <Suspense fallback={<AdminTableSkeleton />}>
      <GiftCodesPage />
    </Suspense>
  );
}

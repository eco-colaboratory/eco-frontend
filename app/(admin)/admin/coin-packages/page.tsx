import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { CoinPackagesPage } from './components/coin-packages-page';

export const metadata: Metadata = {
  title: 'Quản lý gói nạp',
};

export default function Page() {
  return (
    <Suspense fallback={<AdminTableSkeleton />}>
      <CoinPackagesPage />
    </Suspense>
  );
}

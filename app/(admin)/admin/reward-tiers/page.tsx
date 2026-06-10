import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { RewardTiersPage } from './components/reward-tiers-page';

export const metadata: Metadata = {
  title: 'Mốc thưởng',
};

export default function Page() {
  return (
    <Suspense fallback={<AdminTableSkeleton />}>
      <RewardTiersPage />
    </Suspense>
  );
}

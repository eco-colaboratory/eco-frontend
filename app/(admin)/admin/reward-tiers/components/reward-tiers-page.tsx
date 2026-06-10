'use client';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { RewardTiersProvider } from './reward-tiers-provider';
import { RewardTiersTable } from './reward-tiers-table';
import { RewardTiersDialogs } from './reward-tiers-dialogs';

export function RewardTiersPage() {
  return (
    <AdminRouteShell>
      <RewardTiersProvider>
        <RewardTiersTable />
        <RewardTiersDialogs />
      </RewardTiersProvider>
    </AdminRouteShell>
  );
}

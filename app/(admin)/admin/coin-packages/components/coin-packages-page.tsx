'use client';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { CoinPackagesProvider } from './coin-packages-provider';
import { CoinPackagesTable } from './coin-packages-table';
import { CoinPackagesDialogs } from './coin-packages-dialogs';

export function CoinPackagesPage() {
  return (
    <AdminRouteShell>
      <CoinPackagesProvider>
        <CoinPackagesTable />
        <CoinPackagesDialogs />
      </CoinPackagesProvider>
    </AdminRouteShell>
  );
}

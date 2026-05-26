'use client';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { ItemsProvider } from './items-provider';
import { ItemsTable } from './items-table';
import { ItemsDialogs } from './items-dialogs';

export function ItemsPage() {
  return (
    <AdminRouteShell>
      <ItemsProvider>
        <ItemsTable />
        <ItemsDialogs />
      </ItemsProvider>
    </AdminRouteShell>
  );
}

'use client';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { GiftCodesProvider } from './gift-codes-provider';
import { GiftCodesTable } from './gift-codes-table';
import { GiftCodesDialogs } from './gift-codes-dialogs';

export function GiftCodesPage() {
  return (
    <AdminRouteShell>
      <GiftCodesProvider>
        <GiftCodesTable />
        <GiftCodesDialogs />
      </GiftCodesProvider>
    </AdminRouteShell>
  );
}

'use client';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { DecorsProvider } from './decors-provider';
import { DecorsTable } from './decors-table';
import { DecorsDialogs } from './decors-dialogs';

export function DecorsPage() {
  return (
    <AdminRouteShell>
      <DecorsProvider>
        <DecorsTable />
        <DecorsDialogs />
      </DecorsProvider>
    </AdminRouteShell>
  );
}

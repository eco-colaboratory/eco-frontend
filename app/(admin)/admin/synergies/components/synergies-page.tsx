'use client';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { SynergiesProvider } from './synergies-provider';
import { SynergiesTable } from './synergies-table';
import { SynergiesDialogs } from './synergies-dialogs';

export function SynergiesPage() {
  return (
    <AdminRouteShell>
      <SynergiesProvider>
        <SynergiesTable />
        <SynergiesDialogs />
      </SynergiesProvider>
    </AdminRouteShell>
  );
}

'use client';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { FlowerTemplatesProvider } from './flower-templates-provider';
import { FlowerTemplatesTable } from './flower-templates-table';
import { FlowerTemplatesDialogs } from './flower-templates-dialogs';

export function FlowerTemplatesPage() {
  return (
    <AdminRouteShell>
      <FlowerTemplatesProvider>
        <FlowerTemplatesTable />
        <FlowerTemplatesDialogs />
      </FlowerTemplatesProvider>
    </AdminRouteShell>
  );
}

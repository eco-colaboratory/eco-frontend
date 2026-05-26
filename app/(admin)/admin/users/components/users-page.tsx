'use client';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { UsersDialogs } from './users-dialogs';
import { UsersProvider } from './users-provider';
import { UsersTable } from './users-table';

export function UsersPage() {
  return (
    <AdminRouteShell>
      <UsersProvider>
        <UsersTable />
        <UsersDialogs />
      </UsersProvider>
    </AdminRouteShell>
  );
}

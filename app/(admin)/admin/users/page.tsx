import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { UsersPage } from './components/users-page';

export const metadata: Metadata = {
  title: 'Users',
};

export default function Page() {
  return (
    <Suspense fallback={<AdminTableSkeleton />}>
      <UsersPage />
    </Suspense>
  );
}

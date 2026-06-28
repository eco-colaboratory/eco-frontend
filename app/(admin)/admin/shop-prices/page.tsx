import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { ShopPricesPage } from './components/shop-prices-page';

export const metadata: Metadata = {
  title: 'Quản lý giá cửa hàng',
};

export default function Page() {
  return (
    <Suspense fallback={<AdminTableSkeleton />}>
      <ShopPricesPage />
    </Suspense>
  );
}

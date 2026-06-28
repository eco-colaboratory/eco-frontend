'use client';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { ShopPricesProvider } from './shop-prices-provider';
import { ShopPricesTable } from './shop-prices-table';
import { ShopPricesDialogs } from './shop-prices-dialogs';

export function ShopPricesPage() {
  return (
    <AdminRouteShell>
      <ShopPricesProvider>
        <ShopPricesTable />
        <ShopPricesDialogs />
      </ShopPricesProvider>
    </AdminRouteShell>
  );
}

'use client';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { CatalogCrudPage } from '@/components/admin/catalog/catalog-crud-page';
import { itemsPageConfig } from '@/lib/admin/catalog/entities/items.config';

export function ItemsPage() {
  return (
    <AdminRouteShell>
      <CatalogCrudPage {...itemsPageConfig} />
    </AdminRouteShell>
  );
}

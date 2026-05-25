'use client';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { CatalogCrudPage } from '@/components/admin/catalog/catalog-crud-page';
import { flowerTemplatesPageConfig } from '@/lib/admin/catalog/entities/flower-templates.config';

export function FlowerTemplatesPage() {
  return (
    <AdminRouteShell>
      <CatalogCrudPage {...flowerTemplatesPageConfig} />
    </AdminRouteShell>
  );
}

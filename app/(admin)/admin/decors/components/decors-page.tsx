'use client';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { CatalogCrudPage } from '@/components/admin/catalog/catalog-crud-page';
import { decorsPageConfig } from '@/lib/admin/catalog/entities/decors.config';

export function DecorsPage() {
  return (
    <AdminRouteShell>
      <CatalogCrudPage {...decorsPageConfig} />
    </AdminRouteShell>
  );
}

'use client';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { CatalogCrudPage } from '@/components/admin/catalog/catalog-crud-page';
import { synergiesPageConfig } from '@/lib/admin/catalog/entities/synergies.config';

/** Recipe B — list + CRUD via shared CatalogCrudPage */
export function SynergiesPage() {
  return (
    <AdminRouteShell>
      <CatalogCrudPage {...synergiesPageConfig} />
    </AdminRouteShell>
  );
}

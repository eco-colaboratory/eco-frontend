'use client';

import { z } from 'zod';
import type { Synergy } from '@/lib/types/catalog/synergy';
import { synergiesCatalog } from '../catalog-hooks';
import type { CatalogColumnConfig, CatalogFieldConfig } from '@/components/admin/catalog/catalog-crud-page';

export const synergiesSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  bonusMultiplier: z.coerce.number().optional(),
  itemIds: z.string().optional(),
});

export type SynergiesFormValues = z.infer<typeof synergiesSchema>;

export const synergiesFields: CatalogFieldConfig[] = [
  { name: 'name', label: 'Tên', type: 'text', required: true },
  { name: 'description', label: 'Mô tả', type: 'textarea' },
  { name: 'bonusMultiplier', label: 'Hệ số', type: 'number' },
  {
    name: 'itemIds',
    label: 'Item IDs (phân cách bằng dấu phẩy)',
    type: 'text',
  },
];

export const synergiesColumns: CatalogColumnConfig<Synergy>[] = [
  { id: 'name', header: 'Tên', cell: (r) => r.name },
  {
    id: 'bonus',
    header: 'Hệ số',
    cell: (r) => r.bonusMultiplier ?? '—',
  },
  {
    id: 'items',
    header: 'Items',
    cell: (r) => r.itemIds?.length ?? 0,
  },
];

function parseItemIds(raw?: string): string[] | undefined {
  if (!raw?.trim()) return undefined;
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export const synergiesPageConfig = {
  title: 'Synergies',
  description: 'Quản lý synergy giữa items',
  basePath: '/admin/synergies',
  fields: synergiesFields,
  columns: synergiesColumns,
  schema: synergiesSchema,
  hooks: synergiesCatalog,
  mapToCreate: (v: SynergiesFormValues) => ({
    name: v.name,
    description: v.description || undefined,
    bonusMultiplier: v.bonusMultiplier,
    itemIds: parseItemIds(v.itemIds),
  }),
  mapToUpdate: (v: SynergiesFormValues) => ({
    name: v.name,
    description: v.description || undefined,
    bonusMultiplier: v.bonusMultiplier,
    itemIds: parseItemIds(v.itemIds),
  }),
};

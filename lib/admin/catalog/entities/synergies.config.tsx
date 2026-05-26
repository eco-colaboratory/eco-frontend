'use client';

import { z } from 'zod';
import type { Synergy } from '@/lib/types/catalog/synergy';
import { synergiesCatalog } from '../catalog-hooks';
import type { CatalogColumnConfig, CatalogFieldConfig } from '@/components/admin/catalog/catalog-crud-page';

export const synergiesSchema = z.object({
  name: z.string().min(1),
  xpPlus: z.coerce.number().optional().default(0),
  cooldownMinus: z.coerce.number().optional().default(0),
});

export type SynergiesFormValues = z.infer<typeof synergiesSchema>;

export const synergiesFields: CatalogFieldConfig[] = [
  { name: 'name', label: 'Tên', type: 'text', required: true },
  { name: 'xpPlus', label: 'Cộng thêm EXP', type: 'number' },
  { name: 'cooldownMinus', label: 'Giảm cooldown (giây)', type: 'number' },
];

export const synergiesColumns: CatalogColumnConfig<Synergy>[] = [
  { id: 'name', header: 'Tên', cell: (r) => r.name },
  {
    id: 'xpPlus',
    header: 'EXP cộng thêm',
    cell: (r) => `+${r.xpPlus} EXP`,
  },
  {
    id: 'cooldownMinus',
    header: 'Giảm cooldown',
    cell: (r) => `-${r.cooldownMinus}s`,
  },
];

export const synergiesPageConfig = {
  title: 'Synergies',
  description: 'Quản lý hệ sinh thái loài hoa',
  basePath: '/admin/synergies',
  fields: synergiesFields,
  columns: synergiesColumns,
  schema: synergiesSchema,
  hooks: synergiesCatalog,
  mapToCreate: (v: SynergiesFormValues) => ({
    name: v.name,
    xpPlus: v.xpPlus,
    cooldownMinus: v.cooldownMinus,
    flowerTemplateIds: [] as string[],
  }),
  mapToUpdate: (v: SynergiesFormValues) => ({
    name: v.name,
    xpPlus: v.xpPlus,
    cooldownMinus: v.cooldownMinus,
    flowerTemplateIds: [] as string[],
  }),
};

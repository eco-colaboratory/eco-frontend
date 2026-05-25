'use client';

import { z } from 'zod';
import type { FlowerTemplate } from '@/lib/types/catalog/flower-template';
import { flowerTemplatesCatalog } from '../catalog-hooks';
import type { CatalogColumnConfig, CatalogFieldConfig } from '@/components/admin/catalog/catalog-crud-page';

export const flowerTemplatesSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  petalCount: z.coerce.number().optional(),
  colorPalette: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

export type FlowerTemplatesFormValues = z.infer<typeof flowerTemplatesSchema>;

export const flowerTemplatesFields: CatalogFieldConfig[] = [
  { name: 'name', label: 'Tên', type: 'text', required: true },
  { name: 'description', label: 'Mô tả', type: 'textarea' },
  { name: 'petalCount', label: 'Số cánh', type: 'number' },
  { name: 'colorPalette', label: 'Màu (phân cách dấu phẩy)', type: 'text' },
  { name: 'imageUrl', label: 'Ảnh URL', type: 'url' },
];

export const flowerTemplatesColumns: CatalogColumnConfig<FlowerTemplate>[] = [
  { id: 'name', header: 'Tên', cell: (r) => r.name },
  { id: 'petals', header: 'Cánh', cell: (r) => r.petalCount ?? '—' },
];

function parsePalette(raw?: string): string[] | undefined {
  if (!raw?.trim()) return undefined;
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

export const flowerTemplatesPageConfig = {
  title: 'Flower Templates',
  description: 'Quản lý mẫu hoa',
  basePath: '/admin/flower-templates',
  fields: flowerTemplatesFields,
  columns: flowerTemplatesColumns,
  schema: flowerTemplatesSchema,
  hooks: flowerTemplatesCatalog,
  mapToCreate: (v: FlowerTemplatesFormValues) => ({
    name: v.name,
    description: v.description || undefined,
    petalCount: v.petalCount,
    colorPalette: parsePalette(v.colorPalette),
    imageUrl: v.imageUrl || undefined,
  }),
  mapToUpdate: (v: FlowerTemplatesFormValues) => ({
    name: v.name,
    description: v.description || undefined,
    petalCount: v.petalCount,
    colorPalette: parsePalette(v.colorPalette),
    imageUrl: v.imageUrl || undefined,
  }),
};

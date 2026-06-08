'use client';

import { z } from 'zod';
import type { FlowerTemplate } from '@/lib/types/catalog/flower-template';
import { flowerTemplatesCatalog } from '../catalog-hooks';
import type { CatalogColumnConfig, CatalogFieldConfig } from '@/components/admin/catalog/catalog-crud-page';

export const flowerTemplatesSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().optional().default(0),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

export type FlowerTemplatesFormValues = z.infer<typeof flowerTemplatesSchema>;

export const flowerTemplatesFields: CatalogFieldConfig[] = [
  { name: 'name', label: 'Tên', type: 'text', required: true },
  { name: 'price', label: 'Giá cơ bản', type: 'number' },
  { name: 'imageUrl', label: 'Ảnh URL', type: 'url' },
];

export const flowerTemplatesColumns: CatalogColumnConfig<FlowerTemplate>[] = [
  { id: 'name', header: 'Tên', cell: (r) => r.name },
  { id: 'basePrice', header: 'Giá cơ bản', cell: (r) => `${r.basePrice} xu` },
];

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
    basePrice: v.price,
    imageUrl: v.imageUrl || undefined,
  }),
  mapToUpdate: (v: FlowerTemplatesFormValues) => ({
    name: v.name,
    basePrice: v.price,
    imageUrl: v.imageUrl || undefined,
  }),
};

'use client';

import { z } from 'zod';
import type { Decor } from '@/lib/types/catalog/decor';
import { decorsCatalog } from '../catalog-hooks';
import type { CatalogColumnConfig, CatalogFieldConfig } from '@/components/admin/catalog/catalog-crud-page';

export const decorsSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

export type DecorsFormValues = z.infer<typeof decorsSchema>;

export const decorsFields: CatalogFieldConfig[] = [
  { name: 'name', label: 'Tên', type: 'text', required: true },
  { name: 'description', label: 'Mô tả', type: 'textarea' },
  { name: 'category', label: 'Danh mục', type: 'text' },
  { name: 'imageUrl', label: 'Ảnh URL', type: 'url' },
];

export const decorsColumns: CatalogColumnConfig<Decor>[] = [
  { id: 'name', header: 'Tên', cell: (r) => r.name },
  { id: 'category', header: 'Danh mục', cell: (r) => r.category ?? '—' },
];

export const decorsPageConfig = {
  title: 'Decors',
  description: 'Quản lý decor',
  basePath: '/admin/decors',
  fields: decorsFields,
  columns: decorsColumns,
  schema: decorsSchema,
  hooks: decorsCatalog,
  mapToCreate: (v: DecorsFormValues) => ({
    name: v.name,
    description: v.description || undefined,
    category: v.category || undefined,
    imageUrl: v.imageUrl || undefined,
  }),
  mapToUpdate: (v: DecorsFormValues) => ({
    name: v.name,
    description: v.description || undefined,
    category: v.category || undefined,
    imageUrl: v.imageUrl || undefined,
  }),
};

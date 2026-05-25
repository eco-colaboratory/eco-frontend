'use client';

import { z } from 'zod';
import type { Item } from '@/lib/types/catalog/item';
import { itemsCatalog } from '../catalog-hooks';
import type { CatalogColumnConfig, CatalogFieldConfig } from '@/components/admin/catalog/catalog-crud-page';

export const itemsSchema = z.object({
  name: z.string().min(1, 'Tên bắt buộc'),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

export type ItemsFormValues = z.infer<typeof itemsSchema>;

export const itemsFields: CatalogFieldConfig[] = [
  { name: 'name', label: 'Tên', type: 'text', required: true },
  { name: 'description', label: 'Mô tả', type: 'textarea' },
  { name: 'price', label: 'Giá', type: 'number' },
  { name: 'imageUrl', label: 'Ảnh URL', type: 'url' },
];

export const itemsColumns: CatalogColumnConfig<Item>[] = [
  { id: 'name', header: 'Tên', cell: (r) => r.name },
  {
    id: 'price',
    header: 'Giá',
    cell: (r) => (r.price != null ? r.price.toLocaleString() : '—'),
  },
  {
    id: 'active',
    header: 'Active',
    cell: (r) => (r.isActive === false ? 'No' : 'Yes'),
  },
];

export const itemsPageConfig = {
  title: 'Items',
  description: 'Quản lý vật phẩm game',
  basePath: '/admin/items',
  fields: itemsFields,
  columns: itemsColumns,
  schema: itemsSchema,
  hooks: itemsCatalog,
  mapToCreate: (v: ItemsFormValues) => ({
    name: v.name,
    description: v.description || undefined,
    price: v.price,
    imageUrl: v.imageUrl || undefined,
  }),
  mapToUpdate: (v: ItemsFormValues) => ({
    name: v.name,
    description: v.description || undefined,
    price: v.price,
    imageUrl: v.imageUrl || undefined,
  }),
};

import { z } from 'zod';
import type { ItemType } from '@/lib/types/catalog/item';

export const ITEM_TYPES = ['WATER', 'FERTILIZER', 'PESTICIDE'] as const;
export type ItemTypeString = (typeof ITEM_TYPES)[number];

export const ITEM_TYPE_MAPPING: Record<ItemTypeString, ItemType> = {
  WATER: 0,
  FERTILIZER: 1,
  PESTICIDE: 2,
};

export const ITEM_TYPE_REVERSE_MAPPING: Record<number, ItemTypeString> = {
  0: 'WATER',
  1: 'FERTILIZER',
  2: 'PESTICIDE',
};

export const ITEM_TYPE_LABELS: Record<ItemTypeString, string> = {
  WATER: 'Bình tưới / Nước',
  FERTILIZER: 'Phân bón',
  PESTICIDE: 'Thuốc trừ sâu',
};

export const itemSchema = z.object({
  name: z.string().min(1, 'Tên vật phẩm bắt buộc'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Giá không thể âm').optional().default(0),
  imageUrl: z.string().url('Đường dẫn ảnh không hợp lệ').optional().or(z.literal('')),
  cooldownTime: z.coerce.number().min(0, 'Thời gian hồi không thể âm').optional().default(0),
  type: z.enum(ITEM_TYPES).default('WATER'),
  receivedExp: z.coerce.number().min(0, 'Kinh nghiệm không thể âm').optional().default(0),
});

export interface ItemFormValues {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  cooldownTime: number;
  type: ItemTypeString;
  receivedExp: number;
}


import { z } from 'zod';

export const DECOR_IMAGE_OPTIONS = [
  { value: 'rock', label: 'Rock' },
  { value: 'grass_fence', label: 'Grass Fence' },
  { value: 'stone_fence', label: 'Stone Fence' },
  { value: 'supper_fence', label: 'Super Fence' },
  { value: 'warter_tower', label: 'Water Tower' },
  { value: 'warterfall', label: 'Waterfall' },
] as const;

const DECOR_IMAGE_SLUGS = DECOR_IMAGE_OPTIONS.map((option) => option.value);

export const decorSchema = z.object({
  name: z.string().min(1, 'Tên đồ trang trí bắt buộc'),
  price: z.coerce.number().min(0, 'Giá không thể âm').optional().default(0),
  imageUrl: z.string().min(1, 'Slug ảnh bắt buộc').refine(
    (value) => DECOR_IMAGE_SLUGS.includes(value as (typeof DECOR_IMAGE_SLUGS)[number]),
    'Slug ảnh trang trí không hợp lệ'
  ),
});

export interface DecorFormValues {
  name: string;
  price: number;
  imageUrl?: string;
}

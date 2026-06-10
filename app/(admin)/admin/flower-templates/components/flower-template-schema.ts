import { z } from 'zod';

export const FLOWER_TEMPLATE_OPTIONS = [
  { value: 'anthurium', label: 'Hạt Hồng Môn' },
  { value: 'lotus', label: 'Hạt Hoa Sen' },
  { value: 'periwinkle', label: 'Hạt Hoa Dừa Cạn' },
  { value: 'purple_bellflower', label: 'Hạt Hoa Chuông Tím' },
  { value: 'rose', label: 'Hạt Hoa Hồng' },
  { value: 'sun_flower', label: 'Hạt Hướng Dương' },
  { value: 'tulip', label: 'Hạt Hoa Tulip' },
] as const;

const FLOWER_TEMPLATE_SLUGS = FLOWER_TEMPLATE_OPTIONS.map((option) => option.value);

export const flowerTemplateSchema = z.object({
  name: z.string().min(1, 'Tên mẫu hoa bắt buộc').refine(
    (value) => FLOWER_TEMPLATE_SLUGS.includes(value as (typeof FLOWER_TEMPLATE_SLUGS)[number]),
    'Tên mẫu hoa phải là slug asset hợp lệ'
  ),
  price: z.coerce.number().min(0, 'Giá không thể âm').default(0),
  imageUrl: z.string().min(1, 'Slug ảnh bắt buộc'),
});

export interface FlowerTemplateFormValues {
  name: string;
  price: number;
  imageUrl?: string;
}

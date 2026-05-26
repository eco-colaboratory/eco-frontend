import { z } from 'zod';

export const flowerTemplateSchema = z.object({
  name: z.string().min(1, 'Tên mẫu hoa bắt buộc'),
  price: z.coerce.number().min(0, 'Giá không thể âm').default(0),
  imageUrl: z.string().url('Đường dẫn ảnh không hợp lệ').optional().or(z.literal('')),
});

export interface FlowerTemplateFormValues {
  name: string;
  price: number;
  imageUrl?: string;
}

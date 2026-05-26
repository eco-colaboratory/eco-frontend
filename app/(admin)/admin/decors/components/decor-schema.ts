import { z } from 'zod';

export const decorSchema = z.object({
  name: z.string().min(1, 'Tên đồ trang trí bắt buộc'),
  price: z.coerce.number().min(0, 'Giá không thể âm').optional().default(0),
  imageUrl: z.string().url('Đường dẫn ảnh không hợp lệ').optional().or(z.literal('')),
});

export interface DecorFormValues {
  name: string;
  price: number;
  imageUrl?: string;
}

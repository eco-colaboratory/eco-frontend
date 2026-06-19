import { z } from 'zod';

export const dailyTaskSchema = z.object({
  target: z.coerce.number().min(1, 'Mục tiêu (số lần/phút) phải lớn hơn 0'),
  rewardCurrency: z.coerce.number().min(0, 'Xu thưởng không thể âm').default(0),
  rewardXP: z.coerce.number().min(0, 'XP thưởng không thể âm').default(0),
  rewardItemId: z.string().nullable().default(null),
  rewardItemQty: z.coerce.number().min(0, 'Số lượng vật phẩm không thể âm').default(0),
}).refine((data) => {
  if (data.rewardItemId && data.rewardItemId !== 'null' && data.rewardItemQty <= 0) {
    return false;
  }
  return true;
}, {
  message: 'Số lượng vật phẩm phải lớn hơn 0 khi chọn vật phẩm thưởng',
  path: ['rewardItemQty'],
});

export type DailyTaskFormValues = z.infer<typeof dailyTaskSchema>;

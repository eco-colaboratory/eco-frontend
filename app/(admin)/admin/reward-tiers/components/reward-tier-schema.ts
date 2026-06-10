import { z } from 'zod';

export const rewardTierSchema = z.object({
  minMinutes: z.coerce.number().min(0, 'Số phút tối thiểu không thể âm'),
  wateringCanQty: z.coerce.number().min(0, 'Số lượng bình tưới không thể âm').default(0),
  fertilizerQty: z.coerce.number().min(0, 'Số lượng phân bón không thể âm').default(0),
});

export type RewardTierFormValues = z.infer<typeof rewardTierSchema>;

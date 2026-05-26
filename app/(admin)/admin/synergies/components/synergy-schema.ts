import { z } from 'zod';

export const synergySchema = z.object({
  name: z.string().min(1, 'Tên hệ sinh thái bắt buộc'),
  xpPlus: z.coerce.number().min(0, 'Chỉ số EXP cộng thêm không thể âm').default(0),
  cooldownMinus: z.coerce.number().min(0, 'Thời gian giảm hồi không thể âm').default(0),
  flowerTemplateIds: z.array(z.string()).default([]),
});

export interface SynergyFormValues {
  name: string;
  xpPlus: number;
  cooldownMinus: number;
  flowerTemplateIds: string[];
}

import { z } from 'zod';

export const REWARD_TYPES = [
  { value: 0, label: 'Xu (Currency)' },
  { value: 1, label: 'Vật phẩm (Item)' },
  { value: 2, label: 'Mẫu hoa (Flower Seed)' },
  { value: 3, label: 'Trang trí (Decor)' },
] as const;

export const giftCodeSchema = z.object({
  code: z
    .string()
    .min(1, 'Mã gift code bắt buộc')
    .max(50, 'Mã gift code không được quá 50 ký tự')
    .regex(/^[A-Za-z0-9_-]+$/, 'Mã gift code chỉ được chứa chữ cái, số, dấu gạch ngang và dấu gạch dưới'),
  expiryDate: z.date({ message: 'Ngày hết hạn bắt buộc' }),
  usageLimit: z
    .union([
      z.coerce.number().int().min(1, 'Giới hạn sử dụng phải từ 1 trở lên'),
      z.literal(''),
      z.null(),
    ])
    .transform((val) => (val === '' ? null : val)),
  rewards: z
    .array(
      z.object({
        rewardType: z.coerce.number().int().min(0).max(3),
        refId: z.string().nullable().optional(),
        quantity: z.coerce.number().int().min(1, 'Số lượng tối thiểu là 1'),
      })
    )
    .min(1, 'Phải có ít nhất một phần thưởng'),
}).superRefine((data, ctx) => {
  data.rewards.forEach((reward, index) => {
    // Nếu không phải là Currency (0), bắt buộc phải có refId hợp lệ (UUID)
    if (reward.rewardType !== 0) {
      if (!reward.refId || reward.refId.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Vui lòng chọn liên kết phần thưởng tương ứng',
          path: ['rewards', index, 'refId'],
        });
      } else {
        // Kiểm tra định dạng UUID
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (!uuidRegex.test(reward.refId)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Định dạng ID tham chiếu không hợp lệ',
            path: ['rewards', index, 'refId'],
          });
        }
      }
    }
  });
});

export type GiftCodeFormValues = z.infer<typeof giftCodeSchema>;

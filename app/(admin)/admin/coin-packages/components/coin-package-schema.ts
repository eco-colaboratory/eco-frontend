import { z } from 'zod';

export const coinPackageSchema = z.object({
  priceVnd: z.coerce
    .number({
      message: 'Giá VND phải là số',
    })
    .min(1000, 'Giá VND tối thiểu phải từ 1,000 VND'),
  coinAmount: z.coerce
    .number({
      message: 'Số coin phải là số',
    })
    .min(1, 'Số coin tối thiểu phải từ 1 Coin'),
});

export type CoinPackageFormValues = z.infer<typeof coinPackageSchema>;

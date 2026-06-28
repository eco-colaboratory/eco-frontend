import { z } from 'zod';

export const shopPriceSchema = z.object({
  price: z.coerce
    .number({
      message: 'Giá sản phẩm phải là số',
    })
    .min(0, 'Giá sản phẩm không được nhỏ hơn 0 xu/VND'),
});

export type ShopPriceFormValues = z.infer<typeof shopPriceSchema>;

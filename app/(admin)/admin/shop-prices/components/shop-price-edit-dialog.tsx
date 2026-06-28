'use client';

import { useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DollarSign } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ShopCatalogItem } from '@/lib/types/catalog/shop-catalog';
import { shopPriceSchema, type ShopPriceFormValues } from './shop-price-schema';

type ShopPriceEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: ShopCatalogItem | null;
  onSubmit: (values: ShopPriceFormValues) => Promise<void>;
  isPending?: boolean;
};

export function ShopPriceEditDialog({
  open,
  onOpenChange,
  item,
  onSubmit,
  isPending,
}: ShopPriceEditDialogProps) {
  const form = useForm<ShopPriceFormValues>({
    resolver: zodResolver(shopPriceSchema) as Resolver<ShopPriceFormValues>,
    defaultValues: {
      price: 0,
    },
  });

  useEffect(() => {
    if (open && item) {
      form.reset({
        price: item.price,
      });
    }
  }, [open, item, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await onSubmit(values);
      onOpenChange(false);
    } catch {
      // Lỗi sẽ được xử lý và hiển thị toast tại component cha
    }
  });

  const getPriceUnit = () => {
    if (!item) return 'xu';
    return item.category === 'CoinPackage' ? 'VND' : 'xu';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="admin-theme max-w-[90vw] sm:max-w-md rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 text-left">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <DollarSign className="size-5 text-primary" />
            Thay đổi giá bán
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Cập nhật giá bán mới cho sản phẩm &ldquo;{item?.name ?? ''}&rdquo;. Giá mới sẽ có hiệu lực ngay lập tức.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <div className="space-y-2">
            <Label htmlFor="price">Giá bán ({getPriceUnit()})</Label>
            <Input
              id="price"
              type="number"
              placeholder={`Nhập giá mới bằng ${getPriceUnit()}...`}
              {...form.register('price')}
            />
            {form.formState.errors.price ? (
              <p className="text-xs text-red-600">{form.formState.errors.price.message}</p>
            ) : null}
          </div>

          <div className="flex justify-end gap-2 pt-4 px-6 pb-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Đang cập nhật...' : 'Cập nhật giá'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

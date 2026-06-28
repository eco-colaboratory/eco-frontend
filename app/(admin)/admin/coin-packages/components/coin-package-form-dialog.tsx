'use client';

import { useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { PlusCircle, Pencil } from 'lucide-react';

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
import type { AdminCoinPackageDto } from '@/lib/types/catalog/coin-package';
import { coinPackageSchema, type CoinPackageFormValues } from './coin-package-schema';

type CoinPackageFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  coinPackage?: AdminCoinPackageDto | null;
  onSubmit: (values: CoinPackageFormValues) => Promise<void>;
  isPending?: boolean;
};

export function CoinPackageFormDialog({
  open,
  onOpenChange,
  mode,
  coinPackage,
  onSubmit,
  isPending,
}: CoinPackageFormDialogProps) {
  const isCreate = mode === 'create';

  const form = useForm<CoinPackageFormValues>({
    resolver: zodResolver(coinPackageSchema) as Resolver<CoinPackageFormValues>,
    defaultValues: {
      priceVnd: 1000,
      coinAmount: 10,
    },
  });

  useEffect(() => {
    if (!open) return;
    if (isCreate) {
      form.reset({
        priceVnd: 10000,
        coinAmount: 100,
      });
    } else if (coinPackage) {
      form.reset({
        priceVnd: coinPackage.priceVnd,
        coinAmount: coinPackage.coinAmount,
      });
    }
  }, [open, isCreate, coinPackage, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await onSubmit(values);
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi lưu gói nạp coin');
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="admin-theme max-w-[90vw] sm:max-w-md rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 text-left">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            {isCreate ? (
              <>
                <PlusCircle className="size-5 text-primary" />
                Tạo gói nạp coin mới
              </>
            ) : (
              <>
                <Pencil className="size-5 text-primary" />
                Sửa gói nạp coin
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {isCreate
              ? 'Nhập các thông tin giá tiền VND và số lượng coin nhận được để tạo gói nạp mới.'
              : 'Thay đổi thông tin giá tiền VND và số lượng coin của gói nạp.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <div className="space-y-2">
            <Label htmlFor="priceVnd">Giá VND (thanh toán)</Label>
            <Input
              id="priceVnd"
              type="number"
              placeholder="Ví dụ: 20000"
              {...form.register('priceVnd')}
            />
            {form.formState.errors.priceVnd ? (
              <p className="text-xs text-red-600">{form.formState.errors.priceVnd.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coinAmount">Số lượng Coin</Label>
            <Input
              id="coinAmount"
              type="number"
              placeholder="Ví dụ: 100"
              {...form.register('coinAmount')}
            />
            {form.formState.errors.coinAmount ? (
              <p className="text-xs text-red-600">{form.formState.errors.coinAmount.message}</p>
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
              {isPending ? 'Đang lưu...' : isCreate ? 'Tạo mới' : 'Cập nhật'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

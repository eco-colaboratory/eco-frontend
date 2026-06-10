'use client';

import { useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Trophy, Pencil } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RewardTier } from '@/lib/types/catalog/reward-tier';
import { rewardTierSchema, type RewardTierFormValues } from './reward-tier-schema';
import { useIsMobile } from '@/hooks/use-mobile';

type RewardTierFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  rewardTier?: RewardTier | null;
  existingTiers?: RewardTier[];
  onSubmit: (values: RewardTierFormValues) => Promise<void>;
  isPending?: boolean;
};

export function RewardTierFormDialog({
  open,
  onOpenChange,
  mode,
  rewardTier,
  existingTiers = [],
  onSubmit,
  isPending,
}: RewardTierFormDialogProps) {
  const isCreate = mode === 'create';
  const isMobile = useIsMobile();

  const form = useForm<RewardTierFormValues>({
    resolver: zodResolver(rewardTierSchema) as Resolver<RewardTierFormValues>,
    defaultValues: {
      minMinutes: 0,
      wateringCanQty: 0,
      fertilizerQty: 0,
    },
  });

  useEffect(() => {
    if (!open) return;
    if (isCreate) {
      form.reset({
        minMinutes: 0,
        wateringCanQty: 0,
        fertilizerQty: 0,
      });
    } else if (rewardTier) {
      form.reset({
        minMinutes: rewardTier.minMinutes ?? 0,
        wateringCanQty: rewardTier.wateringCanQty ?? 0,
        fertilizerQty: rewardTier.fertilizerQty ?? 0,
      });
    }
  }, [open, isCreate, rewardTier, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    // FE validation: Kiểm tra trùng minMinutes
    const isDuplicate = existingTiers.some(
      (tier) =>
        Number(tier.minMinutes) === Number(values.minMinutes) &&
        tier.id !== rewardTier?.id
    );

    if (isDuplicate) {
      form.setError('minMinutes', {
        type: 'manual',
        message: 'Mốc thời gian (phút) này đã tồn tại trong danh sách',
      });
      return;
    }

    try {
      await onSubmit(values);
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi lưu mốc thưởng');
    }
  });

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
      <div className="space-y-2">
        <Label htmlFor="minMinutes">Số phút tối thiểu</Label>
        <Input
          id="minMinutes"
          type="number"
          placeholder="Ví dụ: 25, 50, 75..."
          {...form.register('minMinutes', { valueAsNumber: true })}
        />
        {form.formState.errors.minMinutes ? (
          <p className="text-xs text-red-600">{form.formState.errors.minMinutes.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="wateringCanQty">Số lượng Bình tưới nhận được</Label>
        <Input
          id="wateringCanQty"
          type="number"
          placeholder="Số lượng bình tưới..."
          {...form.register('wateringCanQty', { valueAsNumber: true })}
        />
        {form.formState.errors.wateringCanQty ? (
          <p className="text-xs text-red-600">{form.formState.errors.wateringCanQty.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="fertilizerQty">Số lượng Phân bón nhận được</Label>
        <Input
          id="fertilizerQty"
          type="number"
          placeholder="Số lượng phân bón..."
          {...form.register('fertilizerQty', { valueAsNumber: true })}
        />
        {form.formState.errors.fertilizerQty ? (
          <p className="text-xs text-red-600">{form.formState.errors.fertilizerQty.message}</p>
        ) : null}
      </div>

      <div className="pt-2 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Hủy
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Đang lưu…' : 'Lưu'}
        </Button>
      </div>
    </form>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="admin-theme rounded-t-2xl px-0 pb-6 pt-2 border-t max-h-[92vh] overflow-y-auto">
          <div className="mx-auto my-2 h-1.5 w-12 rounded-full bg-muted-foreground/20 shrink-0" />
          <SheetHeader className="px-6 border-b border-border/60 pb-3 bg-muted/10">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bloom-green-mid/10 text-bloom-green-mid">
                {isCreate ? <Trophy className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
              </div>
              <div className="text-left space-y-0.5">
                <SheetTitle className="text-base font-bold">
                  {isCreate ? 'Thêm mốc thưởng' : 'Sửa mốc thưởng'}
                </SheetTitle>
                <SheetDescription className="text-xs">
                  {isCreate ? 'Tạo cấu hình mốc thưởng tập trung mới.' : 'Cập nhật thông tin mốc thưởng.'}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
          {formContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="admin-theme gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="space-y-0 border-b border-border/60 bg-muted/30 px-6 py-4">
          <div className="flex items-start gap-3 pr-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bloom-green-mid/10 text-bloom-green-mid">
              {isCreate ? (
                <Trophy className="h-5 w-5" aria-hidden />
              ) : (
                <Pencil className="h-5 w-5" aria-hidden />
              )}
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-base">
                {isCreate ? 'Thêm mốc thưởng' : 'Sửa mốc thưởng'}
              </DialogTitle>
              <DialogDescription>
                {isCreate
                  ? 'Tạo cấu hình mốc thưởng mới dựa trên số phút tập trung.'
                  : 'Cập nhật lại phần thưởng của mốc này.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}

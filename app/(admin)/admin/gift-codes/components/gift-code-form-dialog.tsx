'use client';

import { useEffect, useMemo } from 'react';
import { useForm, useWatch, useFieldArray, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Ticket, Pencil, Plus, Trash2 } from 'lucide-react';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { useItemsList } from '@/hooks/useItems';
import { useFlowerTemplatesList } from '@/hooks/useFlowerTemplates';
import { useDecorsList } from '@/hooks/useDecors';
import type { GiftCode } from '@/lib/types/catalog/gift-code';
import { giftCodeSchema, type GiftCodeFormValues, REWARD_TYPES } from './gift-code-schema';
import { DatePicker } from '@/components/ui/date-picker';

type GiftCodeFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  giftCode?: GiftCode | null;
  onSubmit: (values: GiftCodeFormValues) => Promise<void>;
  isPending?: boolean;
};


export function GiftCodeFormDialog({
  open,
  onOpenChange,
  mode,
  giftCode,
  onSubmit,
  isPending,
}: GiftCodeFormDialogProps) {
  const isCreate = mode === 'create';
  const isMobile = useIsMobile();

  // Load danh sách phần thưởng hệ thống để chọn trực quan
  const { data: itemsData } = useItemsList({ page: 1, pageSize: 100 });
  const { data: flowerTemplatesData } = useFlowerTemplatesList({ page: 1, pageSize: 100 });
  const { data: decorsData } = useDecorsList({ page: 1, pageSize: 100 });

  const itemsList = useMemo(() => itemsData?.items ?? [], [itemsData]);
  const flowerTemplatesList = useMemo(() => flowerTemplatesData?.items ?? [], [flowerTemplatesData]);
  const decorsList = useMemo(() => decorsData?.items ?? [], [decorsData]);

  const form = useForm<GiftCodeFormValues>({
    resolver: zodResolver(giftCodeSchema) as Resolver<GiftCodeFormValues>,
    defaultValues: {
      code: '',
      expiryDate: new Date(),
      usageLimit: null,
      rewards: [{ rewardType: 0, refId: null, quantity: 1 }],
    },
  });

  const { control, register, handleSubmit, reset, setValue, formState: { errors } } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rewards',
  });

  // Watch toàn bộ mảng rewards để kiểm tra động
  const watchedRewards = useWatch({ control, name: 'rewards' });
  const watchedExpiryDate = useWatch({ control, name: 'expiryDate' });

  useEffect(() => {
    if (!open) return;
    if (isCreate) {
      // Đặt hạn mặc định là 30 ngày kể từ hôm nay
      const defaultExpiry = new Date();
      defaultExpiry.setDate(defaultExpiry.getDate() + 30);
      defaultExpiry.setHours(23, 59, 0, 0);

      reset({
        code: '',
        expiryDate: defaultExpiry,
        usageLimit: null,
        rewards: [{ rewardType: 0, refId: null, quantity: 100 }],
      });
    } else if (giftCode) {
      reset({
        code: giftCode.code ?? '',
        expiryDate: giftCode.expiryDate ? new Date(giftCode.expiryDate) : new Date(),
        usageLimit: giftCode.usageLimit ?? null,
        rewards: giftCode.rewards?.map((r) => ({
          rewardType: r.rewardType,
          refId: r.refId ?? null,
          quantity: r.quantity ?? 1,
        })) ?? [{ rewardType: 0, refId: null, quantity: 1 }],
      });
    }
  }, [open, isCreate, giftCode, reset]);

  const handleFormSubmit = handleSubmit(async (values) => {
    try {
      // Chuẩn hoá code sang Trim và UpperCase
      const formattedValues = {
        ...values,
        code: values.code.trim().toUpperCase(),
      };
      await onSubmit(formattedValues);
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi lưu thông tin Gift Code');
    }
  });

  const getRewardOptions = (rewardType: number) => {
    switch (rewardType) {
      case 1: // Item
        return itemsList.map((item) => ({ value: item.id, label: item.name }));
      case 2: // FlowerSeed
        return flowerTemplatesList.map((seed) => ({ value: seed.id, label: seed.name }));
      case 3: // Decor
        return decorsList.map((decor) => ({ value: decor.id, label: decor.name }));
      default:
        return [];
    }
  };

  const formContent = (
    <form onSubmit={handleFormSubmit} className="space-y-5 px-6 py-5 max-h-[75vh] overflow-y-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="code">Mã Gift Code</Label>
          <Input
            id="code"
            placeholder="Ví dụ: SUMMER2026"
            className="font-mono uppercase"
            {...register('code')}
          />
          {errors.code ? (
            <p className="text-xs text-red-600">{errors.code.message}</p>
          ) : (
            <p className="text-[10px] text-muted-foreground">Sẽ tự động chuyển thành CHỮ HOA và xóa khoảng trắng.</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="usageLimit">Giới hạn sử dụng</Label>
          <Input
            id="usageLimit"
            type="number"
            placeholder="Để trống = Không giới hạn"
            {...register('usageLimit')}
          />
          {errors.usageLimit ? (
            <p className="text-xs text-red-600">{errors.usageLimit.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="expiryDate">Ngày hết hạn (Local Time)</Label>
        <DatePicker
          date={watchedExpiryDate}
          setDate={(date) => {
            setValue('expiryDate', date || new Date(), {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
        {errors.expiryDate ? (
          <p className="text-xs text-red-600">{String(errors.expiryDate.message)}</p>
        ) : null}
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between border-b border-border/80 pb-2">
          <Label className="text-sm font-semibold">Danh sách phần thưởng</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ rewardType: 0, refId: null, quantity: 1 })}
            className="h-8 gap-1 text-xs px-2.5 shadow-none"
          >
            <Plus className="h-3.5 w-3.5" />
            Thêm phần thưởng
          </Button>
        </div>

        {errors.rewards?.root ? (
          <p className="text-xs font-semibold text-red-600">{errors.rewards.root.message}</p>
        ) : null}

        {errors.rewards && !Array.isArray(errors.rewards) && 'message' in errors.rewards && errors.rewards.message ? (
          <p className="text-xs font-semibold text-red-600">{String(errors.rewards.message)}</p>
        ) : null}

        <div className="space-y-3">
          {fields.map((field, index) => {
            const currentRewardType = watchedRewards[index]?.rewardType ?? 0;
            const options = getRewardOptions(currentRewardType);

            return (
              <div
                key={field.id}
                className="group relative flex flex-col gap-3 rounded-lg border border-border bg-muted/20 p-3.5 transition-all duration-200 hover:border-border/100"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 items-end">
                  {/* Loại phần thưởng */}
                  <div className="sm:col-span-4 space-y-1.5">
                    <Label className="text-xs">Loại phần thưởng</Label>
                    <Select
                      value={String(currentRewardType)}
                      onValueChange={(val) => {
                        const typeNum = Number(val);
                        setValue(`rewards.${index}.rewardType`, typeNum, { shouldDirty: true, shouldValidate: true });
                        setValue(`rewards.${index}.refId`, null, { shouldDirty: true, shouldValidate: true });
                      }}
                    >
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        {REWARD_TYPES.map((type) => (
                          <SelectItem key={type.value} value={String(type.value)} className="text-xs">
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Vật phẩm cụ thể */}
                  <div className="sm:col-span-5 space-y-1.5">
                    <Label className="text-xs">
                      {currentRewardType === 0 ? 'Tham chiếu (Không dùng)' : 'Chọn vật phẩm'}
                    </Label>
                    {currentRewardType === 0 ? (
                      <Input
                        disabled
                        value="Không cần liên kết"
                        className="h-9 text-xs bg-muted/40 border-border text-muted-foreground shadow-none"
                      />
                    ) : (
                      <Select
                        value={watchedRewards[index]?.refId || undefined}
                        onValueChange={(val) => {
                          setValue(`rewards.${index}.refId`, val, { shouldDirty: true, shouldValidate: true });
                        }}
                      >
                        <SelectTrigger className="h-9 text-xs">
                          <SelectValue placeholder="Chọn vật phẩm liên kết..." />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {options.length === 0 ? (
                            <SelectItem value="none" disabled className="text-xs">
                              Đang tải hoặc không có dữ liệu...
                            </SelectItem>
                          ) : (
                            options.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value} className="text-xs">
                                {opt.label}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    )}
                    {errors.rewards?.[index]?.refId ? (
                      <p className="text-[10px] font-medium text-red-600">
                        {errors.rewards[index].refId.message}
                      </p>
                    ) : null}
                  </div>

                  {/* Số lượng */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label className="text-xs">Số lượng</Label>
                    <Input
                      type="number"
                      className="h-9 text-xs"
                      {...register(`rewards.${index}.quantity`)}
                    />
                    {errors.rewards?.[index]?.quantity ? (
                      <p className="text-[10px] font-medium text-red-600">
                        {errors.rewards[index].quantity.message}
                      </p>
                    ) : null}
                  </div>

                  {/* Nút xóa dòng */}
                  <div className="sm:col-span-1 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      disabled={fields.length <= 1}
                      className="h-9 w-9 shrink-0 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 shadow-none disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 flex justify-end gap-2 border-t border-border/80">
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
        <SheetContent side="bottom" className="admin-theme rounded-t-2xl px-0 pb-6 pt-2 border-t max-h-[92vh] flex flex-col">
          <div className="mx-auto my-2 h-1.5 w-12 rounded-full bg-muted-foreground/20 shrink-0" />
          <SheetHeader className="px-6 border-b border-border/60 pb-3 bg-muted/10">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bloom-green-mid/10 text-bloom-green-mid">
                {isCreate ? <Ticket className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
              </div>
              <div className="text-left space-y-0.5">
                <SheetTitle className="text-base font-bold">
                  {isCreate ? 'Tạo Gift Code' : 'Sửa Gift Code'}
                </SheetTitle>
                <SheetDescription className="text-xs">
                  {isCreate ? 'Tạo mã khuyến mãi mới cùng quà tặng.' : 'Cập nhật cấu hình Gift Code.'}
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
      <DialogContent className="admin-theme gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="space-y-0 border-b border-border/60 bg-muted/30 px-6 py-4">
          <div className="flex items-start gap-3 pr-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bloom-green-mid/10 text-bloom-green-mid">
              {isCreate ? (
                <Ticket className="h-5 w-5" aria-hidden />
              ) : (
                <Pencil className="h-5 w-5" aria-hidden />
              )}
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-base">
                {isCreate ? 'Tạo Gift Code' : 'Sửa Gift Code'}
              </DialogTitle>
              <DialogDescription>
                {isCreate
                  ? 'Thiết lập mã khuyến mãi và danh sách phần thưởng khi đổi code.'
                  : 'Cập nhật các phần thưởng hoặc hạn dùng của mã khuyến mãi.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}

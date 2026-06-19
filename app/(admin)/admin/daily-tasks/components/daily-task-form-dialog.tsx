'use client';

import { useEffect } from 'react';
import { useForm, Controller, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ListTodo, Pencil } from 'lucide-react';

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
import type { DailyTask } from '@/lib/types/catalog/daily-task';
import { dailyTaskSchema, type DailyTaskFormValues } from './daily-task-schema';
import { useIsMobile } from '@/hooks/use-mobile';
import { useItemsList } from '@/hooks/useItems';

type DailyTaskFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dailyTask?: DailyTask | null;
  onSubmit: (values: DailyTaskFormValues) => Promise<void>;
  isPending?: boolean;
};

export function DailyTaskFormDialog({
  open,
  onOpenChange,
  dailyTask,
  onSubmit,
  isPending,
}: DailyTaskFormDialogProps) {
  const isMobile = useIsMobile();

  // Lấy danh sách items để gán rewardItemId
  const { data: itemsData } = useItemsList({ page: 1, pageSize: 100 });
  const items = itemsData?.items ?? [];

  const form = useForm<DailyTaskFormValues>({
    resolver: zodResolver(dailyTaskSchema) as Resolver<DailyTaskFormValues>,
    defaultValues: {
      target: 1,
      rewardCurrency: 0,
      rewardXP: 0,
      rewardItemId: 'null',
      rewardItemQty: 0,
    },
  });

  useEffect(() => {
    if (!open) return;
    if (dailyTask) {
      form.reset({
        target: dailyTask.target ?? 1,
        rewardCurrency: dailyTask.rewardCurrency ?? 0,
        rewardXP: dailyTask.rewardXP ?? 0,
        rewardItemId: dailyTask.rewardItemId ?? 'null',
        rewardItemQty: dailyTask.rewardItemQty ?? 0,
      });
    }
  }, [open, dailyTask, form]);

  const rewardItemId = form.watch('rewardItemId');
  const hasRewardItem = rewardItemId && rewardItemId !== 'null';

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const payload = {
        ...values,
        rewardItemId: values.rewardItemId === 'null' ? null : values.rewardItemId,
        rewardItemQty: values.rewardItemId === 'null' ? 0 : values.rewardItemQty,
      };
      await onSubmit(payload);
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi lưu cấu hình nhiệm vụ');
    }
  });

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
      {/* Read-only info */}
      {dailyTask && (
        <div className="rounded-lg bg-muted/40 p-3 space-y-1.5 text-xs text-muted-foreground border border-border/40">
          <p>
            <span className="font-semibold text-foreground">Loại nhiệm vụ:</span> {dailyTask.type}
            {dailyTask.actionSubtype && ` (${dailyTask.actionSubtype})`}
          </p>
          <p>
            <span className="font-semibold text-foreground">Chu kỳ:</span> {dailyTask.cycle}
          </p>
          <p>
            <span className="font-semibold text-foreground">Mô tả mặc định:</span> {dailyTask.description}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="target">Mục tiêu (Số lần / Số phút)</Label>
        <Input
          id="target"
          type="number"
          placeholder="Ví dụ: 3, 5, 30..."
          {...form.register('target', { valueAsNumber: true })}
        />
        {form.formState.errors.target ? (
          <p className="text-xs text-red-600">{form.formState.errors.target.message}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rewardCurrency">Xu thưởng (Currency)</Label>
          <Input
            id="rewardCurrency"
            type="number"
            placeholder="Số lượng xu..."
            {...form.register('rewardCurrency', { valueAsNumber: true })}
          />
          {form.formState.errors.rewardCurrency ? (
            <p className="text-xs text-red-600">{form.formState.errors.rewardCurrency.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="rewardXP">XP thưởng</Label>
          <Input
            id="rewardXP"
            type="number"
            placeholder="Số lượng XP..."
            {...form.register('rewardXP', { valueAsNumber: true })}
          />
          {form.formState.errors.rewardXP ? (
            <p className="text-xs text-red-600">{form.formState.errors.rewardXP.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rewardItemId">Vật phẩm thưởng</Label>
          <Controller
            control={form.control}
            name="rewardItemId"
            render={({ field }) => (
              <Select
                onValueChange={(val) => {
                  field.onChange(val);
                  if (val === 'null') {
                    form.setValue('rewardItemQty', 0);
                  }
                }}
                value={field.value ?? 'null'}
              >
                <SelectTrigger id="rewardItemId" className="w-full h-9">
                  <SelectValue placeholder="Chọn vật phẩm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">Không có</SelectItem>
                  {items.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rewardItemQty">Số lượng vật phẩm</Label>
          <Input
            id="rewardItemQty"
            type="number"
            disabled={!hasRewardItem}
            placeholder="Nhập số lượng..."
            {...form.register('rewardItemQty', { valueAsNumber: true })}
          />
          {form.formState.errors.rewardItemQty ? (
            <p className="text-xs text-red-600">{form.formState.errors.rewardItemQty.message}</p>
          ) : null}
        </div>
      </div>

      <div className="pt-2 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Hủy
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Đang lưu…' : 'Lưu thay đổi'}
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
                <ListTodo className="h-4 w-4" />
              </div>
              <div className="text-left space-y-0.5">
                <SheetTitle className="text-base font-bold">
                  Cấu hình nhiệm vụ
                </SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  {dailyTask?.title ? `Chỉnh sửa cấu hình cho: ${dailyTask.title}` : 'Cập nhật mục tiêu và phần thưởng của nhiệm vụ.'}
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
              <Pencil className="h-5 w-5" aria-hidden />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-base">
                Cấu hình nhiệm vụ
              </DialogTitle>
              <DialogDescription>
                {dailyTask?.title ? `Chỉnh sửa cấu hình cho: ${dailyTask.title}` : 'Cập nhật mục tiêu và phần thưởng của nhiệm vụ.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}

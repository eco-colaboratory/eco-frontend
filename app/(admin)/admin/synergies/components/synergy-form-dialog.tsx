'use client';

import { useEffect, useMemo } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Layers, Pencil } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SafeImage } from '@/components/ui/safeImage copy';
import type { Synergy } from '@/lib/types/catalog/synergy';
import { synergySchema, type SynergyFormValues } from './synergy-schema';
import { useFlowerTemplatesList } from '@/hooks/useFlowerTemplates';

type SynergyFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  synergy?: Synergy | null;
  onSubmit: (values: SynergyFormValues) => Promise<void>;
  isPending?: boolean;
};

export function SynergyFormDialog({
  open,
  onOpenChange,
  mode,
  synergy,
  onSubmit,
  isPending,
}: SynergyFormDialogProps) {
  const isCreate = mode === 'create';

  const form = useForm<SynergyFormValues>({
    resolver: zodResolver(synergySchema) as Resolver<SynergyFormValues>,
    defaultValues: {
      name: '',
      xpPlus: 0,
      cooldownMinus: 0,
      flowerTemplateIds: [],
    },
  });

  const flowerParams = useMemo(() => ({
    page: 1,
    pageSize: 100, // Load nhiều để chọn
  }), []);

  const { data: flowerTemplatesData, isLoading: isLoadingFlowers } = useFlowerTemplatesList(flowerParams);

  const flowerTemplates = flowerTemplatesData?.items ?? [];

  useEffect(() => {
    if (!open) return;
    if (isCreate) {
      form.reset({
        name: '',
        xpPlus: 0,
        cooldownMinus: 0,
        flowerTemplateIds: [],
      });
    } else if (synergy) {
      form.reset({
        name: synergy.name ?? '',
        xpPlus: synergy.xpPlus ?? 0,
        cooldownMinus: synergy.cooldownMinus ?? 0,
        flowerTemplateIds: synergy.flowerTemplates?.map((f) => f.id) ?? [],
      });
    }
  }, [open, isCreate, synergy, form]);

  const selectedFlowerTemplateIds = form.watch('flowerTemplateIds') ?? [];

  const handleToggleFlower = (id: string) => {
    if (selectedFlowerTemplateIds.includes(id)) {
      form.setValue(
        'flowerTemplateIds',
        selectedFlowerTemplateIds.filter((x) => x !== id)
      );
    } else {
      form.setValue('flowerTemplateIds', [...selectedFlowerTemplateIds, id]);
    }
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await onSubmit(values);
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi lưu hệ sinh thái');
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="space-y-0 border-b border-border/60 bg-muted/30 px-6 py-4">
          <div className="flex items-start gap-3 pr-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bloom-green-mid/10 text-bloom-green-mid">
              {isCreate ? (
                <Layers className="h-5 w-5" aria-hidden />
              ) : (
                <Pencil className="h-5 w-5" aria-hidden />
              )}
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-base">
                {isCreate ? 'Thêm hệ sinh thái' : 'Sửa hệ sinh thái'}
              </DialogTitle>
              <DialogDescription>
                {isCreate
                  ? 'Tạo hệ sinh thái mới và liên kết các mẫu hoa.'
                  : 'Cập nhật thông tin chi tiết của hệ sinh thái.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <div className="space-y-2">
            <Label htmlFor="name">Tên hệ sinh thái</Label>
            <Input id="name" placeholder="Nhập tên hệ sinh thái..." {...form.register('name')} />
            {form.formState.errors.name ? (
              <p className="text-xs text-red-600">{form.formState.errors.name.message}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="xpPlus">Cộng thêm EXP</Label>
              <Input
                id="xpPlus"
                type="number"
                placeholder="EXP cộng thêm..."
                {...form.register('xpPlus')}
              />
              {form.formState.errors.xpPlus ? (
                <p className="text-xs text-red-600">{form.formState.errors.xpPlus.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cooldownMinus">Giảm cooldown (giây)</Label>
              <Input
                id="cooldownMinus"
                type="number"
                placeholder="Số giây hồi giảm..."
                {...form.register('cooldownMinus')}
              />
              {form.formState.errors.cooldownMinus ? (
                <p className="text-xs text-red-600">{form.formState.errors.cooldownMinus.message}</p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Các mẫu hoa liên kết</Label>
            <div className="rounded-md border border-border bg-background">
              <div className="h-44 overflow-y-auto px-3 py-2">
                {isLoadingFlowers ? (
                  <p className="text-xs text-muted-foreground p-2">Đang tải danh sách mẫu hoa...</p>
                ) : flowerTemplates.length === 0 ? (
                  <p className="text-xs text-muted-foreground p-2">Không có mẫu hoa nào khả dụng.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {flowerTemplates.map((template) => {
                      const isChecked = selectedFlowerTemplateIds.includes(template.id);
                      return (
                        <div
                          key={template.id}
                          className="flex items-center space-x-3 rounded-lg border border-border/40 p-2 hover:bg-muted/30 cursor-pointer transition-colors duration-150"
                          onClick={() => handleToggleFlower(template.id)}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleFlower(template.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="h-4 w-4 rounded border-border text-bloom-green-mid focus:ring-bloom-green-mid/30 cursor-pointer accent-bloom-green-mid"
                          />
                          <SafeImage
                            src={template.imageUrl}
                            alt={template.name}
                            className="h-8 w-8 rounded object-cover border border-border"
                          />
                          <span className="text-xs font-medium truncate">{template.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Đang lưu…' : 'Lưu'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Flower, Pencil } from 'lucide-react';

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
import type { FlowerTemplate } from '@/lib/types/catalog/flower-template';
import { flowerTemplateSchema, type FlowerTemplateFormValues } from './flower-template-schema';
import { useIsMobile } from '@/hooks/use-mobile';

type FlowerTemplateFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  template?: FlowerTemplate | null;
  onSubmit: (values: FlowerTemplateFormValues) => Promise<void>;
  isPending?: boolean;
};

export function FlowerTemplateFormDialog({
  open,
  onOpenChange,
  mode,
  template,
  onSubmit,
  isPending,
}: FlowerTemplateFormDialogProps) {
  const isCreate = mode === 'create';
  const isMobile = useIsMobile();

  const form = useForm<FlowerTemplateFormValues>({
    resolver: zodResolver(flowerTemplateSchema) as Resolver<FlowerTemplateFormValues>,
    defaultValues: {
      name: '',
      price: 0,
      imageUrl: '',
    },
  });

  useEffect(() => {
    if (!open) return;
    if (isCreate) {
      form.reset({
        name: '',
        price: 0,
        imageUrl: '',
      });
    } else if (template) {
      form.reset({
        name: template.name ?? '',
        price: template.basePrice ?? 0,
        imageUrl: template.imageUrl ?? '',
      });
    }
  }, [open, isCreate, template, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await onSubmit(values);
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi lưu mẫu hoa');
    }
  });

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
      <div className="space-y-2">
        <Label htmlFor="name">Tên mẫu hoa</Label>
        <Input id="name" placeholder="Nhập tên mẫu hoa..." {...form.register('name')} />
        {form.formState.errors.name ? (
          <p className="text-xs text-red-600">{form.formState.errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Giá xu cơ bản</Label>
        <Input id="price" type="number" placeholder="Số xu..." {...form.register('price')} />
        {form.formState.errors.price ? (
          <p className="text-xs text-red-600">{form.formState.errors.price.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Đường dẫn ảnh (URL)</Label>
        <Input id="imageUrl" placeholder="Nhập URL ảnh..." {...form.register('imageUrl')} />
        {form.formState.errors.imageUrl ? (
          <p className="text-xs text-red-600">{form.formState.errors.imageUrl.message}</p>
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
                {isCreate ? <Flower className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
              </div>
              <div className="text-left space-y-0.5">
                <SheetTitle className="text-base font-bold">
                  {isCreate ? 'Thêm mẫu hoa' : 'Sửa mẫu hoa'}
                </SheetTitle>
                <SheetDescription className="text-xs">
                  {isCreate ? 'Tạo mẫu hoa mới.' : 'Cập nhật thông tin mẫu hoa.'}
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
                <Flower className="h-5 w-5" aria-hidden />
              ) : (
                <Pencil className="h-5 w-5" aria-hidden />
              )}
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-base">
                {isCreate ? 'Thêm mẫu hoa' : 'Sửa mẫu hoa'}
              </DialogTitle>
              <DialogDescription>
                {isCreate
                  ? 'Tạo một mẫu hoa mới trong hệ thống trò chơi.'
                  : 'Cập nhật các thông tin của mẫu hoa.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}

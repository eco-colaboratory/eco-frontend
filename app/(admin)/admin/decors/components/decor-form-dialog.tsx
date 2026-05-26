'use client';

import { useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Palette, Pencil } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Decor } from '@/lib/types/catalog/decor';
import { decorSchema, type DecorFormValues } from './decor-schema';
import { useIsMobile } from '@/hooks/use-mobile';

type DecorFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  decor?: Decor | null;
  onSubmit: (values: DecorFormValues) => Promise<void>;
  isPending?: boolean;
};

export function DecorFormDialog({
  open,
  onOpenChange,
  mode,
  decor,
  onSubmit,
  isPending,
}: DecorFormDialogProps) {
  const isCreate = mode === 'create';
  const isMobile = useIsMobile();

  const form = useForm<DecorFormValues>({
    resolver: zodResolver(decorSchema) as Resolver<DecorFormValues>,
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
    } else if (decor) {
      form.reset({
        name: decor.name ?? '',
        price: decor.price ?? 0,
        imageUrl: decor.imageUrl ?? '',
      });
    }
  }, [open, isCreate, decor, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await onSubmit(values);
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi lưu đồ trang trí');
    }
  });

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
      <div className="space-y-2">
        <Label htmlFor="name">Tên đồ trang trí</Label>
        <Input id="name" placeholder="Nhập tên đồ trang trí..." {...form.register('name')} />
        {form.formState.errors.name ? (
          <p className="text-xs text-red-600">{form.formState.errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Giá xu</Label>
        <Input id="price" type="number" placeholder="Số xu cần mua..." {...form.register('price')} />
        {form.formState.errors.price ? (
          <p className="text-xs text-red-600">{form.formState.errors.price.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Ảnh URL</Label>
        <Input id="imageUrl" placeholder="Nhập đường dẫn ảnh..." {...form.register('imageUrl')} />
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
                {isCreate ? <Palette className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
              </div>
              <div className="text-left space-y-0.5">
                <SheetTitle className="text-base font-bold">
                  {isCreate ? 'Thêm đồ trang trí' : 'Sửa đồ trang trí'}
                </SheetTitle>
                <SheetDescription className="text-xs">
                  {isCreate ? 'Tạo vật phẩm trang trí mới.' : 'Cập nhật thông tin đồ trang trí.'}
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
                <Palette className="h-5 w-5" aria-hidden />
              ) : (
                <Pencil className="h-5 w-5" aria-hidden />
              )}
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-base">
                {isCreate ? 'Thêm đồ trang trí' : 'Sửa đồ trang trí'}
              </DialogTitle>
              <DialogDescription>
                {isCreate
                  ? 'Tạo vật phẩm trang trí mới trong trò chơi.'
                  : 'Cập nhật thông tin chi tiết của đồ trang trí.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}

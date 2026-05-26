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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Decor } from '@/lib/types/catalog/decor';
import { decorSchema, type DecorFormValues } from './decor-schema';

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-xl">
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

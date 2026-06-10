'use client';

import { useEffect } from 'react';
import { useForm, useWatch, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { PackagePlus, Pencil } from 'lucide-react';

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
import type { Item } from '@/lib/types/catalog/item';
import {
  itemSchema,
  ITEM_TYPES,
  ITEM_IMAGE_SLUGS,
  ITEM_TYPE_LABELS,
  ITEM_TYPE_REVERSE_MAPPING,
  type ItemFormValues,
  type ItemTypeString,
} from './item-schema';
import { useIsMobile } from '@/hooks/use-mobile';

type ItemFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  item?: Item | null;
  onSubmit: (values: ItemFormValues) => Promise<void>;
  isPending?: boolean;
};

export function ItemFormDialog({
  open,
  onOpenChange,
  mode,
  item,
  onSubmit,
  isPending,
}: ItemFormDialogProps) {
  const isCreate = mode === 'create';
  const isMobile = useIsMobile();
  
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema) as Resolver<ItemFormValues>,
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      cooldownTime: 0,
      type: 'WATER',
      receivedExp: 0,
    },
  });
  const selectedType = useWatch({ control: form.control, name: 'type' }) ?? 'WATER';
  const selectedImageUrl = useWatch({ control: form.control, name: 'imageUrl' });

  useEffect(() => {
    if (!open) return;
    if (isCreate) {
      form.reset({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        cooldownTime: 0,
        type: 'WATER',
        receivedExp: 0,
      });
    } else if (item) {
      const typeStr = item.type !== undefined
        ? (typeof item.type === 'number'
            ? ITEM_TYPE_REVERSE_MAPPING[item.type as number] || 'WATER'
            : item.type as ItemTypeString)
        : 'WATER';

      form.reset({
        name: item.name ?? '',
        description: item.description ?? '',
        price: item.price ?? 0,
        imageUrl: item.imageUrl ?? '',
        cooldownTime: item.cooldownTime ?? 0,
        type: typeStr,
        receivedExp: item.receivedExp ?? 0,
      });
    }
  }, [open, isCreate, item, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await onSubmit(values);
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi lưu vật phẩm');
    }
  });

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
      <div className="space-y-2">
        <Label htmlFor="name">Tên vật phẩm</Label>
        <Input id="name" placeholder="Nhập tên vật phẩm..." {...form.register('name')} />
        {form.formState.errors.name ? (
          <p className="text-xs text-red-600">{form.formState.errors.name.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả</Label>
        <Input id="description" placeholder="Nhập mô tả vật phẩm..." {...form.register('description')} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="price">Giá xu</Label>
          <Input id="price" type="number" placeholder="Số xu cần mua..." {...form.register('price')} />
          {form.formState.errors.price ? (
            <p className="text-xs text-red-600">{form.formState.errors.price.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cooldownTime">Thời gian hồi (giây)</Label>
          <Input id="cooldownTime" type="number" placeholder="Thời gian hồi..." {...form.register('cooldownTime')} />
          {form.formState.errors.cooldownTime ? (
            <p className="text-xs text-red-600">{form.formState.errors.cooldownTime.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Loại vật phẩm</Label>
          <Select
            value={selectedType}
            onValueChange={(v) => {
              const type = v as ItemTypeString;
              form.setValue('type', type, { shouldDirty: true, shouldValidate: true });
              form.setValue('imageUrl', ITEM_IMAGE_SLUGS[type][0], {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại vật phẩm" />
            </SelectTrigger>
            <SelectContent>
              {ITEM_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {ITEM_TYPE_LABELS[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="receivedExp">Kinh nghiệm nhận (EXP)</Label>
          <Input id="receivedExp" type="number" placeholder="Kinh nghiệm nhận..." {...form.register('receivedExp')} />
          {form.formState.errors.receivedExp ? (
            <p className="text-xs text-red-600">{form.formState.errors.receivedExp.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Slug ảnh Godot</Label>
        <Select
          value={selectedImageUrl || undefined}
          onValueChange={(value) => form.setValue('imageUrl', value, { shouldDirty: true, shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn slug ảnh" />
          </SelectTrigger>
          <SelectContent>
            {ITEM_IMAGE_SLUGS[selectedType].map((slug) => (
              <SelectItem key={slug} value={slug}>
                {slug}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
                {isCreate ? <PackagePlus className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
              </div>
              <div className="text-left space-y-0.5">
                <SheetTitle className="text-base font-bold">
                  {isCreate ? 'Thêm vật phẩm' : 'Sửa vật phẩm'}
                </SheetTitle>
                <SheetDescription className="text-xs">
                  {isCreate ? 'Tạo vật phẩm mới.' : 'Cập nhật thông tin vật phẩm.'}
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
                <PackagePlus className="h-5 w-5" aria-hidden />
              ) : (
                <Pencil className="h-5 w-5" aria-hidden />
              )}
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-base">
                {isCreate ? 'Thêm vật phẩm' : 'Sửa vật phẩm'}
              </DialogTitle>
              <DialogDescription>
                {isCreate
                  ? 'Tạo vật phẩm mới với thông tin thuộc tính và vai trò trong game.'
                  : 'Cập nhật thông tin chi tiết của vật phẩm.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}

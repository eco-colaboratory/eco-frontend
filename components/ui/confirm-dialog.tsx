'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  isPending?: boolean;
  variant?: 'danger' | 'success' | 'primary';
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  onConfirm,
  isPending,
  variant = 'danger',
}: ConfirmDialogProps) {
  let confirmButtonClass = 'bg-red-600 hover:bg-red-700 text-white shadow-none';
  if (variant === 'success') {
    confirmButtonClass = 'bg-bloom-green-mid hover:bg-bloom-green-mid/95 text-white shadow-none';
  } else if (variant === 'primary') {
    confirmButtonClass = 'bg-primary text-primary-foreground hover:bg-primary/90';
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="admin-theme max-w-[90vw] sm:max-w-md rounded-2xl p-6 gap-4">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2 sm:gap-0 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 sm:flex-none"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            disabled={isPending}
            className={`flex-1 sm:flex-none ${confirmButtonClass}`}
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
          >
            {isPending ? 'Đang xử lý…' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

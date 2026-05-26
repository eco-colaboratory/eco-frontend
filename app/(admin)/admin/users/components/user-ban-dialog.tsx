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

export function UserBanDialog({
  open,
  onOpenChange,
  username,
  isBanned,
  onConfirm,
  isPending,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  isBanned: boolean;
  onConfirm: () => void;
  isPending?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isBanned ? 'Mở khóa người dùng' : 'Khóa người dùng'}</DialogTitle>
          <DialogDescription>
            {isBanned
              ? `Mở khóa tài khoản "${username}"? Người dùng này sẽ có thể đăng nhập lại.`
              : `Khóa tài khoản "${username}"? Người dùng này sẽ không thể đăng nhập hệ thống.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            type="button"
            disabled={isPending}
            className={isBanned ? 'bg-bloom-green-mid hover:bg-bloom-green-mid/95 text-white shadow-none' : 'bg-red-600 hover:bg-red-700 text-white shadow-none'}
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
          >
            {isPending ? 'Đang xử lý…' : isBanned ? 'Mở khóa' : 'Khóa'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

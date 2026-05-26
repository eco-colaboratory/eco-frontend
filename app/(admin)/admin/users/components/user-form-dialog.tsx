'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserPen, UserPlus } from 'lucide-react';
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
import type { AdminUser } from '@/lib/types/admin/user';
import { ASSIGNABLE_ROLES } from '@/lib/types/admin/user';
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserFormValues,
  type UpdateUserFormValues,
} from './user-schema';

type UserFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  user?: AdminUser | null;
  onSubmit: (values: CreateUserFormValues | UpdateUserFormValues) => Promise<void>;
  isPending?: boolean;
};

const ROLE_LABELS: Record<string, string> = {
  Admin: 'Quản trị viên',
  SuperAdmin: 'Quản trị tối cao',
  Instructor: 'Giảng viên',
  Student: 'Học sinh',
  Player: 'Người chơi',
  Cashier: 'Thu ngân',
};

export function UserFormDialog({
  open,
  onOpenChange,
  mode,
  user,
  onSubmit,
  isPending,
}: UserFormDialogProps) {
  const isCreate = mode === 'create';
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(isCreate ? createUserSchema : updateUserSchema) as any,
    defaultValues: {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      role: 'Player',
      currency: 0,
      level: 1,
    },
  });

  useEffect(() => {
    if (!open) return;
    if (isCreate) {
      form.reset({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        role: 'Player',
        currency: 0,
        level: 1,
      });
    } else if (user) {
      form.reset({
        username: user.username,
        email: user.email ?? '',
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        role: (user.role as (typeof ASSIGNABLE_ROLES)[number]) ?? 'Player',
        currency: user.currency ?? 0,
        level: user.level ?? 1,
      });
    }
  }, [open, isCreate, user, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await onSubmit(values);
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi lưu user');
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="space-y-0 border-b border-border/60 bg-muted/30 px-6 py-4">
          <div className="flex items-start gap-3 pr-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bloom-green-mid/10 text-bloom-green-mid">
              {isCreate ? (
                <UserPlus className="h-5 w-5" aria-hidden />
              ) : (
                <UserPen className="h-5 w-5" aria-hidden />
              )}
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-base">
                {isCreate ? 'Thêm người dùng' : 'Sửa người dùng'}
              </DialogTitle>
              <DialogDescription>
                {isCreate
                  ? 'Tạo tài khoản mới với thông tin đăng nhập và vai trò trong hệ thống.'
                  : 'Cập nhật thông tin và quyền hạn của người dùng.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input id="username" placeholder="Nhập tên đăng nhập..." {...form.register('username')} />
              {form.formState.errors.username ? (
                <p className="text-xs text-red-600">{form.formState.errors.username.message}</p>
              ) : null}
            </div>
            {isCreate ? (
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input id="password" type="password" placeholder="Nhập mật khẩu..." {...form.register('password')} />
                {form.formState.errors.password ? (
                  <p className="text-xs text-red-600">{form.formState.errors.password.message}</p>
                ) : null}
              </div>
            ) : null}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Nhập địa chỉ email..." {...form.register('email')} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">Họ</Label>
                <Input id="firstName" placeholder="Họ (ví dụ: Nguyễn)..." {...form.register('firstName')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Tên</Label>
                <Input id="lastName" placeholder="Tên (ví dụ: Văn A)..." {...form.register('lastName')} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="level">Cấp độ</Label>
                <Input id="level" type="number" placeholder="Cấp độ (ví dụ: 1)..." {...form.register('level')} />
                {form.formState.errors.level ? (
                  <p className="text-xs text-red-600">{form.formState.errors.level.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Xu</Label>
                <Input id="currency" type="number" placeholder="Số xu (ví dụ: 100)..." {...form.register('currency')} />
                {form.formState.errors.currency ? (
                  <p className="text-xs text-red-600">{form.formState.errors.currency.message}</p>
                ) : null}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Vai trò</Label>
              <Select
                // eslint-disable-next-line react-hooks/incompatible-library
                value={form.watch('role') ?? 'Player'}
                onValueChange={(v) => form.setValue('role', v as (typeof ASSIGNABLE_ROLES)[number])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  {ASSIGNABLE_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {ROLE_LABELS[role] ?? role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

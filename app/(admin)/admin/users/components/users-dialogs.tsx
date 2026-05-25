'use client';

import { toast } from 'sonner';

import { useAppSelector } from '@/lib/redux/hooks';
import { selectUser } from '@/lib/redux/slices/authSlice';
import type { CreateUserFormValues, UpdateUserFormValues } from './user-schema';
import {
  useBanUser,
  useCreateUser,
  useUnbanUser,
  useUpdateUser,
} from '@/hooks/admin/useUsers';
import { UserBanDialog } from './user-ban-dialog';
import { UserFormDialog } from './user-form-dialog';
import { useUsersPage } from './users-provider';

export function UsersDialogs() {
  const currentAdmin = useAppSelector(selectUser);
  const {
    formOpen,
    setFormOpen,
    formMode,
    selectedUser,
    banTarget,
    setBanTarget,
  } = useUsersPage();

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const banMutation = useBanUser();
  const unbanMutation = useUnbanUser();

  const handleCreate = async (values: CreateUserFormValues | UpdateUserFormValues) => {
    const v = values as CreateUserFormValues;
    await createMutation.mutateAsync({
      username: v.username,
      password: v.password,
      email: v.email || undefined,
      firstName: v.firstName,
      lastName: v.lastName,
      role: v.role,
      currency: v.currency,
      level: v.level,
    });
    toast.success('Đã tạo user');
  };

  const handleUpdate = async (values: CreateUserFormValues | UpdateUserFormValues) => {
    if (!selectedUser) return;
    const v = values as UpdateUserFormValues;
    await updateMutation.mutateAsync({
      id: selectedUser.id,
      payload: {
        username: v.username,
        email: v.email || undefined,
        firstName: v.firstName,
        lastName: v.lastName,
        role: v.role,
        currency: v.currency,
        level: v.level,
      },
    });
    toast.success('Đã cập nhật user');
  };

  const confirmBan = async () => {
    if (!banTarget) return;
    if (banTarget.id === currentAdmin?.id) {
      toast.error('Không thể cấm tài khoản của chính bạn');
      return;
    }
    try {
      if (banTarget.isBanned) {
        await unbanMutation.mutateAsync(banTarget.id);
        toast.success('Đã bỏ cấm');
      } else {
        await banMutation.mutateAsync(banTarget.id);
        toast.success('Đã cấm user');
      }
      setBanTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi thao tác');
    }
  };

  return (
    <>
      <UserFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        user={selectedUser}
        onSubmit={formMode === 'create' ? handleCreate : handleUpdate}
        isPending={createMutation.isPending || updateMutation.isPending}
      />
      <UserBanDialog
        open={!!banTarget}
        onOpenChange={(o) => !o && setBanTarget(null)}
        username={banTarget?.username ?? ''}
        isBanned={!!banTarget?.isBanned}
        onConfirm={() => void confirmBan()}
        isPending={banMutation.isPending || unbanMutation.isPending}
      />
    </>
  );
}

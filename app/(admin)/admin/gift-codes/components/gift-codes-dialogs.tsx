'use client';

import { toast } from 'sonner';
import {
  useCreateGiftCode,
  useUpdateGiftCode,
  useDeleteGiftCode,
} from '@/hooks/useGiftCodes';
import { GiftCodeFormDialog } from './gift-code-form-dialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useGiftCodesPage } from './gift-codes-provider';
import type { GiftCodeFormValues } from './gift-code-schema';

export function GiftCodesDialogs() {
  const {
    formOpen,
    setFormOpen,
    formMode,
    selectedGiftCode,
    deleteTarget,
    setDeleteTarget,
  } = useGiftCodesPage();

  const createMutation = useCreateGiftCode();
  const updateMutation = useUpdateGiftCode();
  const deleteMutation = useDeleteGiftCode();

  const handleCreate = async (values: GiftCodeFormValues) => {
    await createMutation.mutateAsync({
      code: values.code.trim().toUpperCase(),
      expiryDate: values.expiryDate.toISOString(),
      usageLimit: values.usageLimit,
      rewards: values.rewards.map((r) => ({
        rewardType: r.rewardType,
        refId: r.refId || null,
        quantity: r.quantity,
      })),
    });
    toast.success('Đã tạo mã Gift Code mới');
  };

  const handleUpdate = async (values: GiftCodeFormValues) => {
    if (!selectedGiftCode) return;
    await updateMutation.mutateAsync({
      id: selectedGiftCode.id,
      payload: {
        code: values.code.trim().toUpperCase(),
        expiryDate: values.expiryDate.toISOString(),
        usageLimit: values.usageLimit,
        rewards: values.rewards.map((r) => ({
          rewardType: r.rewardType,
          refId: r.refId || null,
          quantity: r.quantity,
        })),
      },
    });
    toast.success('Đã cập nhật mã Gift Code');
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Đã xóa Gift Code thành công');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi thao tác xóa Gift Code');
    }
  };

  return (
    <>
      <GiftCodeFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        giftCode={selectedGiftCode}
        onSubmit={formMode === 'create' ? handleCreate : handleUpdate}
        isPending={createMutation.isPending || updateMutation.isPending}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Xóa Gift Code"
        description={`Bạn có chắc chắn muốn xóa vĩnh viễn Gift Code "${deleteTarget?.code ?? ''}" khỏi hệ thống? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        onConfirm={() => void confirmDelete()}
        isPending={deleteMutation.isPending}
        variant="danger"
      />
    </>
  );
}

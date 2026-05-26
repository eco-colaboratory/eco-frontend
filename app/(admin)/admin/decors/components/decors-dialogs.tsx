'use client';

import { toast } from 'sonner';
import {
  useCreateDecor,
  useUpdateDecor,
  useDeleteDecor,
} from '@/hooks/useDecors';
import { DecorFormDialog } from './decor-form-dialog';
import { DecorDeleteDialog } from './decor-delete-dialog';
import { useDecorsPage } from './decors-provider';
import type { DecorFormValues } from './decor-schema';

export function DecorsDialogs() {
  const {
    formOpen,
    setFormOpen,
    formMode,
    selectedDecor,
    deleteTarget,
    setDeleteTarget,
  } = useDecorsPage();

  const createMutation = useCreateDecor();
  const updateMutation = useUpdateDecor();
  const deleteMutation = useDeleteDecor();

  const handleCreate = async (values: DecorFormValues) => {
    await createMutation.mutateAsync({
      name: values.name,
      price: values.price,
      imageUrl: values.imageUrl || undefined,
    });
    toast.success('Đã tạo đồ trang trí mới');
  };

  const handleUpdate = async (values: DecorFormValues) => {
    if (!selectedDecor) return;
    await updateMutation.mutateAsync({
      id: selectedDecor.id,
      payload: {
        name: values.name,
        price: values.price,
        imageUrl: values.imageUrl || undefined,
      },
    });
    toast.success('Đã cập nhật đồ trang trí');
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Đã xóa đồ trang trí thành công');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi thao tác xóa đồ trang trí');
    }
  };

  return (
    <>
      <DecorFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        decor={selectedDecor}
        onSubmit={formMode === 'create' ? handleCreate : handleUpdate}
        isPending={createMutation.isPending || updateMutation.isPending}
      />
      <DecorDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        name={deleteTarget?.name ?? ''}
        onConfirm={() => void confirmDelete()}
        isPending={deleteMutation.isPending}
      />
    </>
  );
}

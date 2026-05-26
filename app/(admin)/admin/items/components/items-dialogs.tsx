'use client';

import { toast } from 'sonner';
import {
  useCreateItem,
  useUpdateItem,
  useDeleteItem,
} from '@/hooks/useItems';
import { ItemFormDialog } from './item-form-dialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useItemsPage } from './items-provider';
import { ITEM_TYPE_MAPPING, type ItemFormValues } from './item-schema';

export function ItemsDialogs() {
  const {
    formOpen,
    setFormOpen,
    formMode,
    selectedItem,
    deleteTarget,
    setDeleteTarget,
  } = useItemsPage();

  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();

  const handleCreate = async (values: ItemFormValues) => {
    await createMutation.mutateAsync({
      name: values.name,
      description: values.description || undefined,
      price: values.price,
      imageUrl: values.imageUrl || undefined,
      cooldownTime: values.cooldownTime,
      type: ITEM_TYPE_MAPPING[values.type],
      receivedExp: values.receivedExp,
    });
    toast.success('Đã tạo vật phẩm mới');
  };

  const handleUpdate = async (values: ItemFormValues) => {
    if (!selectedItem) return;
    await updateMutation.mutateAsync({
      id: selectedItem.id,
      payload: {
        name: values.name,
        description: values.description || undefined,
        price: values.price,
        imageUrl: values.imageUrl || undefined,
        cooldownTime: values.cooldownTime,
        type: ITEM_TYPE_MAPPING[values.type],
        receivedExp: values.receivedExp,
      },
    });
    toast.success('Đã cập nhật vật phẩm');
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Đã xóa vật phẩm thành công');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi thao tác xóa vật phẩm');
    }
  };

  return (
    <>
      <ItemFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        item={selectedItem}
        onSubmit={formMode === 'create' ? handleCreate : handleUpdate}
        isPending={createMutation.isPending || updateMutation.isPending}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Xóa vật phẩm"
        description={`Bạn có chắc chắn muốn xóa vật phẩm "${deleteTarget?.name ?? ''}"? Hành động này sẽ chuyển trạng thái vật phẩm thành đã xóa (soft-delete).`}
        confirmText="Xóa"
        onConfirm={() => void confirmDelete()}
        isPending={deleteMutation.isPending}
        variant="danger"
      />
    </>
  );
}

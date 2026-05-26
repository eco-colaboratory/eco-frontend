'use client';

import { toast } from 'sonner';
import {
  useCreateFlowerTemplate,
  useUpdateFlowerTemplate,
  useDeleteFlowerTemplate,
} from '@/hooks/useFlowerTemplates';
import { FlowerTemplateFormDialog } from './flower-template-form-dialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useFlowerTemplatesPage } from './flower-templates-provider';
import type { FlowerTemplateFormValues } from './flower-template-schema';

export function FlowerTemplatesDialogs() {
  const {
    formOpen,
    setFormOpen,
    formMode,
    selectedTemplate,
    deleteTarget,
    setDeleteTarget,
  } = useFlowerTemplatesPage();

  const createMutation = useCreateFlowerTemplate();
  const updateMutation = useUpdateFlowerTemplate();
  const deleteMutation = useDeleteFlowerTemplate();

  const handleCreate = async (values: FlowerTemplateFormValues) => {
    await createMutation.mutateAsync({
      name: values.name,
      price: values.price,
      imageUrl: values.imageUrl || undefined,
    });
    toast.success('Đã tạo mẫu hoa mới');
  };

  const handleUpdate = async (values: FlowerTemplateFormValues) => {
    if (!selectedTemplate) return;
    await updateMutation.mutateAsync({
      id: selectedTemplate.id,
      payload: {
        name: values.name,
        price: values.price,
        imageUrl: values.imageUrl || undefined,
      },
    });
    toast.success('Đã cập nhật mẫu hoa');
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Đã xóa mẫu hoa thành công');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi thao tác xóa mẫu hoa');
    }
  };

  return (
    <>
      <FlowerTemplateFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        template={selectedTemplate}
        onSubmit={formMode === 'create' ? handleCreate : handleUpdate}
        isPending={createMutation.isPending || updateMutation.isPending}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Xóa mẫu hoa"
        description={`Bạn có chắc chắn muốn xóa mẫu hoa "${deleteTarget?.name ?? ''}"? Hành động này sẽ chuyển trạng thái mẫu hoa thành đã xóa (soft-delete).`}
        confirmText="Xóa"
        onConfirm={() => void confirmDelete()}
        isPending={deleteMutation.isPending}
        variant="danger"
      />
    </>
  );
}

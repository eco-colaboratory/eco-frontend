'use client';

import { toast } from 'sonner';
import {
  useCreateSynergy,
  useUpdateSynergy,
  useDeleteSynergy,
} from '@/hooks/useSynergies';
import { SynergyFormDialog } from './synergy-form-dialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useSynergiesPage } from './synergies-provider';
import type { SynergyFormValues } from './synergy-schema';

export function SynergiesDialogs() {
  const {
    formOpen,
    setFormOpen,
    formMode,
    selectedSynergy,
    deleteTarget,
    setDeleteTarget,
  } = useSynergiesPage();

  const createMutation = useCreateSynergy();
  const updateMutation = useUpdateSynergy();
  const deleteMutation = useDeleteSynergy();

  const handleCreate = async (values: SynergyFormValues) => {
    await createMutation.mutateAsync({
      name: values.name,
      xpPlus: values.xpPlus,
      cooldownMinus: values.cooldownMinus,
      flowerTemplateIds: values.flowerTemplateIds,
    });
    toast.success('Đã tạo hệ sinh thái mới');
  };

  const handleUpdate = async (values: SynergyFormValues) => {
    if (!selectedSynergy) return;
    await updateMutation.mutateAsync({
      id: selectedSynergy.id,
      payload: {
        name: values.name,
        xpPlus: values.xpPlus,
        cooldownMinus: values.cooldownMinus,
        flowerTemplateIds: values.flowerTemplateIds,
      },
    });
    toast.success('Đã cập nhật hệ sinh thái');
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Đã xóa hệ sinh thái thành công');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi thao tác xóa hệ sinh thái');
    }
  };

  return (
    <>
      <SynergyFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        synergy={selectedSynergy}
        onSubmit={formMode === 'create' ? handleCreate : handleUpdate}
        isPending={createMutation.isPending || updateMutation.isPending}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Xóa hệ sinh thái"
        description={`Bạn có chắc chắn muốn xóa hệ sinh thái "${deleteTarget?.name ?? ''}"? Hành động này sẽ chuyển trạng thái hệ sinh thái thành đã xóa (soft-delete).`}
        confirmText="Xóa"
        onConfirm={() => void confirmDelete()}
        isPending={deleteMutation.isPending}
        variant="danger"
      />
    </>
  );
}

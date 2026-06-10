'use client';

import { toast } from 'sonner';
import {
  useCreateRewardTier,
  useUpdateRewardTier,
  useDeleteRewardTier,
  useRewardTiersList,
} from '@/hooks/useRewardTiers';
import { RewardTierFormDialog } from './reward-tier-form-dialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useRewardTiersPage } from './reward-tiers-provider';
import type { RewardTierFormValues } from './reward-tier-schema';

export function RewardTiersDialogs() {
  const {
    formOpen,
    setFormOpen,
    formMode,
    selectedRewardTier,
    deleteTarget,
    setDeleteTarget,
  } = useRewardTiersPage();

  const createMutation = useCreateRewardTier();
  const updateMutation = useUpdateRewardTier();
  const deleteMutation = useDeleteRewardTier();

  // Fetch toàn bộ danh sách để check trùng minMinutes
  const { data: allTiersData } = useRewardTiersList({ page: 1, pageSize: 100 });
  const existingTiers = allTiersData?.items ?? [];

  const handleCreate = async (values: RewardTierFormValues) => {
    await createMutation.mutateAsync({
      minMinutes: values.minMinutes,
      wateringCanQty: values.wateringCanQty,
      fertilizerQty: values.fertilizerQty,
    });
    toast.success('Đã tạo mốc thưởng mới thành công');
  };

  const handleUpdate = async (values: RewardTierFormValues) => {
    if (!selectedRewardTier) return;
    await updateMutation.mutateAsync({
      id: selectedRewardTier.id,
      payload: {
        minMinutes: values.minMinutes,
        wateringCanQty: values.wateringCanQty,
        fertilizerQty: values.fertilizerQty,
      },
    });
    toast.success('Đã cập nhật mốc thưởng thành công');
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Đã xóa mốc thưởng thành công');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi thao tác xóa mốc thưởng');
    }
  };

  return (
    <>
      <RewardTierFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        rewardTier={selectedRewardTier}
        existingTiers={existingTiers}
        onSubmit={formMode === 'create' ? handleCreate : handleUpdate}
        isPending={createMutation.isPending || updateMutation.isPending}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Xóa mốc thưởng"
        description={`Bạn có chắc chắn muốn xóa mốc thưởng "${deleteTarget?.minMinutes} phút"? Hành động này sẽ xóa vĩnh viễn mốc thưởng khỏi hệ thống.`}
        confirmText="Xóa"
        onConfirm={() => void confirmDelete()}
        isPending={deleteMutation.isPending}
        variant="danger"
      />
    </>
  );
}

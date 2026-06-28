'use client';

import { toast } from 'sonner';
import {
  useCreateCoinPackage,
  useUpdateCoinPackage,
  useDeleteCoinPackage,
} from '@/hooks/useCoinPackages';
import { CoinPackageFormDialog } from './coin-package-form-dialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useCoinPackagesPage } from './coin-packages-provider';
import type { CoinPackageFormValues } from './coin-package-schema';

export function CoinPackagesDialogs() {
  const {
    formOpen,
    setFormOpen,
    formMode,
    selectedPackage,
    deleteTarget,
    setDeleteTarget,
  } = useCoinPackagesPage();

  const createMutation = useCreateCoinPackage();
  const updateMutation = useUpdateCoinPackage();
  const deleteMutation = useDeleteCoinPackage();

  const handleCreate = async (values: CoinPackageFormValues) => {
    await createMutation.mutateAsync({
      priceVnd: values.priceVnd,
      coinAmount: values.coinAmount,
    });
    toast.success('Đã tạo gói nạp coin mới');
  };

  const handleUpdate = async (values: CoinPackageFormValues) => {
    if (!selectedPackage) return;
    await updateMutation.mutateAsync({
      id: selectedPackage.id,
      payload: {
        priceVnd: values.priceVnd,
        coinAmount: values.coinAmount,
      },
    });
    toast.success('Đã cập nhật gói nạp coin');
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Đã xóa gói nạp coin thành công');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi thao tác xóa gói nạp coin');
    }
  };

  return (
    <>
      <CoinPackageFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        coinPackage={selectedPackage}
        onSubmit={formMode === 'create' ? handleCreate : handleUpdate}
        isPending={createMutation.isPending || updateMutation.isPending}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Xóa gói nạp coin"
        description={`Bạn có chắc chắn muốn xóa gói nạp ${deleteTarget?.coinAmount ?? 0} Coins (${(deleteTarget?.priceVnd ?? 0).toLocaleString('vi-VN')} VND)? Hành động này sẽ chuyển trạng thái gói nạp thành đã xóa (soft-delete).`}
        confirmText="Xóa"
        onConfirm={() => void confirmDelete()}
        isPending={deleteMutation.isPending}
        variant="danger"
      />
    </>
  );
}

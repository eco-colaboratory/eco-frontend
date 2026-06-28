'use client';

import { toast } from 'sonner';
import { useUpdateShopPrice } from '@/hooks/useShopCatalog';
import { ShopPriceEditDialog } from './shop-price-edit-dialog';
import { useShopPricesPage } from './shop-prices-provider';
import type { ShopPriceFormValues } from './shop-price-schema';

export function ShopPricesDialogs() {
  const { editOpen, setEditOpen, selectedItem } = useShopPricesPage();
  const updatePriceMutation = useUpdateShopPrice();

  const handleUpdatePrice = async (values: ShopPriceFormValues) => {
    if (!selectedItem) return;
    try {
      await updatePriceMutation.mutateAsync({
        prefixedId: selectedItem.id,
        price: values.price,
      });
      toast.success(`Đã cập nhật giá cho sản phẩm "${selectedItem.name}" thành công`);
    } catch (err: unknown) {
      const errorResponse = err as { status?: number; code?: number; message?: string };
      if (
        errorResponse.status === 409 ||
        errorResponse.code === 409 ||
        (errorResponse.message && errorResponse.message.includes('409'))
      ) {
        toast.error('Giá vừa được cập nhật bởi người khác. Vui lòng tải lại và thử lại.');
      } else {
        toast.error(err instanceof Error ? err.message : 'Lỗi cập nhật giá sản phẩm');
      }
      throw err;
    }
  };

  return (
    <ShopPriceEditDialog
      open={editOpen}
      onOpenChange={setEditOpen}
      item={selectedItem}
      onSubmit={handleUpdatePrice}
      isPending={updatePriceMutation.isPending}
    />
  );
}

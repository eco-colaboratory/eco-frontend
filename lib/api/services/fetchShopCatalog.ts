import apiService from '../core';
import { unwrapApiResponse } from '../unwrapApiResponse';
import type { ApiResponse } from '@/lib/types/api/api-response';
import type { ShopCatalogItem, UpdateShopPriceRequest } from '@/lib/types/catalog/shop-catalog';

export type ShopCatalogResponse = ApiResponse<ShopCatalogItem[]>;
export type UpdateShopPriceResponse = ApiResponse<ShopCatalogItem>;

export const fetchShopCatalog = {
  list: async (): Promise<ShopCatalogItem[]> => {
    const response = await apiService.get<ShopCatalogResponse>('api/admin/shop/catalog');
    return unwrapApiResponse(response.data);
  },

  updatePrice: async (prefixedId: string, price: number): Promise<ShopCatalogItem> => {
    const response = await apiService.patch<UpdateShopPriceResponse, UpdateShopPriceRequest>(
      `api/admin/shop/${prefixedId}/price`,
      { price }
    );
    return unwrapApiResponse(response.data);
  },
};

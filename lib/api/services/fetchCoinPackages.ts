import apiService from '../core';
import { unwrapApiResponse } from '../unwrapApiResponse';
import type { ApiResponse } from '@/lib/types/api/api-response';
import type {
  AdminCoinPackageDto,
  CreateCoinPackageRequest,
  UpdateCoinPackageRequest,
  UpdateCoinPackageStatusRequest,
} from '@/lib/types/catalog/coin-package';

export type CoinPackageListResponse = ApiResponse<AdminCoinPackageDto[]>;
export type CoinPackageDetailResponse = ApiResponse<AdminCoinPackageDto>;

export const fetchCoinPackages = {
  list: async (): Promise<AdminCoinPackageDto[]> => {
    const response = await apiService.get<CoinPackageListResponse>('api/admin/coin-packages');
    return unwrapApiResponse(response.data);
  },

  create: async (payload: CreateCoinPackageRequest): Promise<AdminCoinPackageDto> => {
    const response = await apiService.post<CoinPackageDetailResponse, CreateCoinPackageRequest>(
      'api/admin/coin-packages',
      payload
    );
    return unwrapApiResponse(response.data);
  },

  update: async (id: string, payload: UpdateCoinPackageRequest): Promise<AdminCoinPackageDto> => {
    const response = await apiService.put<CoinPackageDetailResponse, UpdateCoinPackageRequest>(
      `api/admin/coin-packages/${id}`,
      payload
    );
    return unwrapApiResponse(response.data);
  },

  updateStatus: async (id: string, isActive: boolean): Promise<AdminCoinPackageDto> => {
    const response = await apiService.patch<CoinPackageDetailResponse, UpdateCoinPackageStatusRequest>(
      `api/admin/coin-packages/${id}/status`,
      { isActive }
    );
    return unwrapApiResponse(response.data);
  },

  remove: async (id: string): Promise<void> => {
    const response = await apiService.delete<ApiResponse<unknown>>(`api/admin/coin-packages/${id}`);
    unwrapApiResponse(response.data);
  },
};

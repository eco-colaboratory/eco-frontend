import apiService from '../core';
import { unwrapApiResponse, ApiResponseError } from '../unwrapApiResponse';
import type { ApiResponse } from '@/lib/types/api/api-response';
import type { PaginatedData } from '@/lib/types/api/pagination';
import type { RewardTier, CreateRewardTierRequest, UpdateRewardTierRequest } from '@/lib/types/catalog/reward-tier';

export interface RewardTierListParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface RewardTierListResponse {
  isSuccess: boolean;
  message: string;
  data: RewardTier[];
  metaData: null;
}

export type RewardTierDetailResponse = ApiResponse<RewardTier>;
export type CreateRewardTierResponse = ApiResponse<RewardTier>;
export type UpdateRewardTierResponse = ApiResponse<RewardTier>;
export type DeleteRewardTierResponse = ApiResponse<unknown>;

export const fetchRewardTiers = {
  list: async (params: RewardTierListParams = {}): Promise<PaginatedData<RewardTier>> => {
    const response = await apiService.get<RewardTierListResponse>('api/admin/focus-rewards/tiers');
    const responseBody = response.data;
    if (!responseBody.isSuccess) {
      throw new ApiResponseError(responseBody.message || 'Request failed', responseBody.data);
    }

    let items = responseBody.data || [];

    // Filter local nếu có search query
    if (params.search) {
      const q = params.search.trim().toLowerCase();
      items = items.filter(
        (item) =>
          String(item.minMinutes).includes(q) ||
          String(item.wateringCanQty).includes(q) ||
          String(item.fertilizerQty).includes(q)
      );
    }

    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 8;
    const totalCount = items.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    const startIndex = (page - 1) * pageSize;
    const paginatedItems = items.slice(startIndex, startIndex + pageSize);

    return {
      items: paginatedItems,
      totalCount,
      page,
      pageSize,
      totalPages,
    };
  },

  getById: async (id: string): Promise<RewardTier> => {
    const response = await apiService.get<RewardTierDetailResponse>(`api/admin/focus-rewards/tiers/${id}`);
    return unwrapApiResponse(response.data);
  },

  create: async (payload: CreateRewardTierRequest): Promise<RewardTier> => {
    const response = await apiService.post<CreateRewardTierResponse, CreateRewardTierRequest>(
      'api/admin/focus-rewards/tiers',
      payload
    );
    return unwrapApiResponse(response.data);
  },

  update: async (id: string, payload: UpdateRewardTierRequest): Promise<RewardTier> => {
    const response = await apiService.patch<UpdateRewardTierResponse, UpdateRewardTierRequest>(
      `api/admin/focus-rewards/tiers/${id}`,
      payload
    );
    return unwrapApiResponse(response.data);
  },

  remove: async (id: string): Promise<void> => {
    const response = await apiService.delete<DeleteRewardTierResponse>(`api/admin/focus-rewards/tiers/${id}`);
    if (response.status === 204) return;
    if (response.data) {
      unwrapApiResponse(response.data);
    }
  },
};

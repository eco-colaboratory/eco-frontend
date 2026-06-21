import apiService from '../core';
import { unwrapApiResponse, ApiResponseError } from '../unwrapApiResponse';
import type { ApiResponse } from '@/lib/types/api/api-response';
import type { PaginatedData } from '@/lib/types/api/pagination';
import type {
  GiftCode,
  CreateGiftCodeRequest,
  UpdateGiftCodeRequest,
} from '@/lib/types/catalog/gift-code';

export interface GiftCodeListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isActive?: boolean;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface GiftCodeListResponse {
  isSuccess: boolean;
  message: string;
  data: {
    items: GiftCode[];
    pagination: {
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  };
  metaData: null;
}

export type GiftCodeDetailResponse = ApiResponse<GiftCode>;
export type CreateGiftCodeResponse = ApiResponse<GiftCode>;
export type UpdateGiftCodeResponse = ApiResponse<GiftCode>;
export type UpdateGiftCodeStatusResponse = ApiResponse<{ id: string; isActive: boolean }>;
export type DeleteGiftCodeResponse = ApiResponse<{ id: string }>;

export const fetchGiftCodes = {
  list: async (params: GiftCodeListParams = {}): Promise<PaginatedData<GiftCode>> => {
    const response = await apiService.get<GiftCodeListResponse>('api/admin/gift-codes', {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 8,
      search: params.search || undefined,
      isActive: params.isActive,
      sortBy: params.sortBy,
      sortDescending: params.sortDescending,
    });

    const responseBody = response.data;
    if (!responseBody.isSuccess) {
      throw new ApiResponseError(responseBody.message || 'Yêu cầu thất bại', responseBody.data);
    }

    const dataObj = responseBody.data;
    const items = dataObj?.items || [];
    const pagination = dataObj?.pagination;

    return {
      items,
      totalCount: pagination?.totalItems ?? items.length,
      page: pagination?.currentPage ?? params.page ?? 1,
      pageSize: pagination?.pageSize ?? params.pageSize ?? 8,
      totalPages: pagination?.totalPages ?? Math.max(1, Math.ceil((pagination?.totalItems ?? items.length) / (pagination?.pageSize ?? params.pageSize ?? 8))),
    };
  },

  getById: async (id: string): Promise<GiftCode> => {
    const response = await apiService.get<GiftCodeDetailResponse>(`api/admin/gift-codes/${id}`);
    return unwrapApiResponse(response.data);
  },

  create: async (payload: CreateGiftCodeRequest): Promise<GiftCode> => {
    const response = await apiService.post<CreateGiftCodeResponse, CreateGiftCodeRequest>(
      'api/admin/gift-codes',
      payload
    );
    return unwrapApiResponse(response.data);
  },

  update: async (id: string, payload: UpdateGiftCodeRequest): Promise<GiftCode> => {
    const response = await apiService.put<UpdateGiftCodeResponse, UpdateGiftCodeRequest>(
      `api/admin/gift-codes/${id}`,
      payload
    );
    return unwrapApiResponse(response.data);
  },

  updateStatus: async (id: string, isActive: boolean): Promise<{ id: string; isActive: boolean }> => {
    const response = await apiService.patch<UpdateGiftCodeStatusResponse, { isActive: boolean }>(
      `api/admin/gift-codes/${id}`,
      { isActive }
    );
    return unwrapApiResponse(response.data);
  },

  remove: async (id: string): Promise<{ id: string }> => {
    const response = await apiService.delete<DeleteGiftCodeResponse>(`api/admin/gift-codes/${id}`);
    return unwrapApiResponse(response.data);
  },
};

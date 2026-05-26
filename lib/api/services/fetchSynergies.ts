import apiService from '../core';
import { unwrapApiResponse, ApiResponseError } from '../unwrapApiResponse';
import type { ApiResponse } from '@/lib/types/api/api-response';
import type { PaginatedData } from '@/lib/types/api/pagination';
import type { Synergy, CreateSynergyRequest, UpdateSynergyRequest } from '@/lib/types/catalog/synergy';

export interface SynergyListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isDeleted?: boolean;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface SynergyListResponseMetaData {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface SynergyListResponse {
  isSuccess: boolean;
  message: string;
  data: Synergy[];
  metaData?: SynergyListResponseMetaData;
}

export type SynergyDetailResponse = ApiResponse<Synergy>;
export type CreateSynergyResponse = ApiResponse<Synergy>;
export type UpdateSynergyResponse = ApiResponse<Synergy>;
export type DeleteSynergyResponse = ApiResponse<unknown>;

export const fetchSynergies = {
  list: async (params: SynergyListParams = {}): Promise<PaginatedData<Synergy>> => {
    const response = await apiService.get<SynergyListResponse>('api/synergies', {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 8,
      search: params.search || undefined,
      isDeleted: params.isDeleted,
      sortBy: params.sortBy,
      sortDescending: params.sortDescending,
    });

    const responseBody = response.data;
    if (!responseBody.isSuccess) {
      throw new ApiResponseError(responseBody.message || 'Request failed', responseBody.data);
    }

    const items = responseBody.data || [];
    const meta = responseBody.metaData;

    return {
      items,
      totalCount: meta?.totalItems ?? items.length,
      page: meta?.currentPage ?? params.page ?? 1,
      pageSize: meta?.pageSize ?? params.pageSize ?? 8,
      totalPages: meta?.totalPages ?? Math.max(1, Math.ceil((meta?.totalItems ?? items.length) / (meta?.pageSize ?? params.pageSize ?? 8))),
    };
  },

  getById: async (id: string): Promise<Synergy> => {
    const response = await apiService.get<SynergyDetailResponse>(`api/synergies/${id}`);
    return unwrapApiResponse(response.data);
  },

  create: async (payload: CreateSynergyRequest): Promise<Synergy> => {
    const response = await apiService.post<CreateSynergyResponse, CreateSynergyRequest>(
      'api/synergies',
      payload
    );
    return unwrapApiResponse(response.data);
  },

  update: async (id: string, payload: UpdateSynergyRequest): Promise<Synergy> => {
    const response = await apiService.put<UpdateSynergyResponse, UpdateSynergyRequest>(
      `api/synergies/${id}`,
      payload
    );
    return unwrapApiResponse(response.data);
  },

  remove: async (id: string): Promise<void> => {
    const response = await apiService.delete<DeleteSynergyResponse>(`api/synergies/${id}`);
    unwrapApiResponse(response.data);
  },
};

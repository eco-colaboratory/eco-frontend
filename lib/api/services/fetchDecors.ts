import apiService from '../core';
import { unwrapApiResponse, ApiResponseError } from '../unwrapApiResponse';
import type { ApiResponse } from '@/lib/types/api/api-response';
import type { PaginatedData } from '@/lib/types/api/pagination';
import type { Decor, CreateDecorRequest, UpdateDecorRequest } from '@/lib/types/catalog/decor';

export interface DecorListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isDeleted?: boolean;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface DecorListResponseMetaData {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface DecorListResponse {
  isSuccess: boolean;
  message: string;
  data: Decor[];
  metaData?: DecorListResponseMetaData;
}

export type DecorDetailResponse = ApiResponse<Decor>;
export type CreateDecorResponse = ApiResponse<Decor>;
export type UpdateDecorResponse = ApiResponse<Decor>;
export type DeleteDecorResponse = ApiResponse<unknown>;

export const fetchDecors = {
  list: async (params: DecorListParams = {}): Promise<PaginatedData<Decor>> => {
    const response = await apiService.get<DecorListResponse>('api/decors', {
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

  getById: async (id: string): Promise<Decor> => {
    const response = await apiService.get<DecorDetailResponse>(`api/decors/${id}`);
    return unwrapApiResponse(response.data);
  },

  create: async (payload: CreateDecorRequest): Promise<Decor> => {
    const response = await apiService.post<CreateDecorResponse, CreateDecorRequest>(
      'api/decors',
      payload
    );
    return unwrapApiResponse(response.data);
  },

  update: async (id: string, payload: UpdateDecorRequest): Promise<Decor> => {
    const response = await apiService.put<UpdateDecorResponse, UpdateDecorRequest>(
      `api/decors/${id}`,
      payload
    );
    return unwrapApiResponse(response.data);
  },

  remove: async (id: string): Promise<void> => {
    const response = await apiService.delete<DeleteDecorResponse>(`api/decors/${id}`);
    unwrapApiResponse(response.data);
  },
};

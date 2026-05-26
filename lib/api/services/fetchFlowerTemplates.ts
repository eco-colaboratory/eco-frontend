import apiService from '../core';
import { unwrapApiResponse, ApiResponseError } from '../unwrapApiResponse';
import type { ApiResponse } from '@/lib/types/api/api-response';
import type { PaginatedData } from '@/lib/types/api/pagination';
import type { FlowerTemplate, CreateFlowerTemplateRequest, UpdateFlowerTemplateRequest } from '@/lib/types/catalog/flower-template';

export interface FlowerTemplateListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isDeleted?: boolean;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface FlowerTemplateListResponseMetaData {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface FlowerTemplateListResponse {
  isSuccess: boolean;
  message: string;
  data: FlowerTemplate[];
  metaData?: FlowerTemplateListResponseMetaData;
}

export type FlowerTemplateDetailResponse = ApiResponse<FlowerTemplate>;
export type CreateFlowerTemplateResponse = ApiResponse<FlowerTemplate>;
export type UpdateFlowerTemplateResponse = ApiResponse<FlowerTemplate>;
export type DeleteFlowerTemplateResponse = ApiResponse<unknown>;

export const fetchFlowerTemplates = {
  list: async (params: FlowerTemplateListParams = {}): Promise<PaginatedData<FlowerTemplate>> => {
    const response = await apiService.get<FlowerTemplateListResponse>('api/flowertemplates', {
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

  getById: async (id: string): Promise<FlowerTemplate> => {
    const response = await apiService.get<FlowerTemplateDetailResponse>(`api/flowertemplates/${id}`);
    return unwrapApiResponse(response.data);
  },

  create: async (payload: CreateFlowerTemplateRequest): Promise<FlowerTemplate> => {
    const response = await apiService.post<CreateFlowerTemplateResponse, CreateFlowerTemplateRequest>(
      'api/flowertemplates',
      payload
    );
    return unwrapApiResponse(response.data);
  },

  update: async (id: string, payload: UpdateFlowerTemplateRequest): Promise<FlowerTemplate> => {
    const response = await apiService.put<UpdateFlowerTemplateResponse, UpdateFlowerTemplateRequest>(
      `api/flowertemplates/${id}`,
      payload
    );
    return unwrapApiResponse(response.data);
  },

  remove: async (id: string): Promise<void> => {
    const response = await apiService.delete<DeleteFlowerTemplateResponse>(`api/flowertemplates/${id}`);
    unwrapApiResponse(response.data);
  },
};

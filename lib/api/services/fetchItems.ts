import apiService from '../core';
import { unwrapApiResponse, ApiResponseError } from '../unwrapApiResponse';
import type { ApiResponse } from '@/lib/types/api/api-response';
import type { PaginatedData } from '@/lib/types/api/pagination';
import type { Item, CreateItemRequest, UpdateItemRequest, ItemType } from '@/lib/types/catalog/item';

export interface ItemListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isDeleted?: boolean;
  type?: ItemType | string;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface ItemListResponseMetaData {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ItemListResponse {
  isSuccess: boolean;
  message: string;
  data: Item[];
  metaData?: ItemListResponseMetaData;
}

export type ItemDetailResponse = ApiResponse<Item>;
export type CreateItemResponse = ApiResponse<Item>;
export type UpdateItemResponse = ApiResponse<Item>;
export type DeleteItemResponse = ApiResponse<unknown>;

export const fetchItems = {
  list: async (params: ItemListParams = {}): Promise<PaginatedData<Item>> => {
    // Gọi API GET /api/items với các tham số
    const response = await apiService.get<ItemListResponse>('api/items', {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 8,
      search: params.search || undefined,
      isDeleted: params.isDeleted,
      type: params.type !== undefined && params.type !== '' ? params.type : undefined,
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

  getById: async (id: string): Promise<Item> => {
    const response = await apiService.get<ItemDetailResponse>(`api/items/${id}`);
    return unwrapApiResponse(response.data);
  },

  create: async (payload: CreateItemRequest): Promise<Item> => {
    const response = await apiService.post<CreateItemResponse, CreateItemRequest>(
      'api/items',
      payload
    );
    return unwrapApiResponse(response.data);
  },

  update: async (id: string, payload: UpdateItemRequest): Promise<Item> => {
    const response = await apiService.put<UpdateItemResponse, UpdateItemRequest>(
      `api/items/${id}`,
      payload
    );
    return unwrapApiResponse(response.data);
  },

  remove: async (id: string): Promise<void> => {
    const response = await apiService.delete<DeleteItemResponse>(`api/items/${id}`);
    unwrapApiResponse(response.data);
  },
};

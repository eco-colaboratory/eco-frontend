import apiService from '@/lib/api/core';
import { unwrapApiResponse } from '@/lib/api/unwrapApiResponse';
import type { ApiResponse } from '@/lib/types/api/api-response';
import type { PaginationParams, PaginatedData } from '@/lib/types/api/pagination';
import { normalizePaginatedData } from '@/lib/types/api/pagination';

export function createCatalogService<
  T extends { id: string },
  TCreate,
  TUpdate = Partial<TCreate>,
>(basePath: string) {
  const path = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;

  return {
    list: async (params: PaginationParams = {}): Promise<PaginatedData<T>> => {
      const response = await apiService.get<ApiResponse<unknown>>(path, {
        page: params.page ?? 1,
        pageSize: params.pageSize ?? 10,
        search: params.search,
      });
      const data = unwrapApiResponse(response.data);
      return normalizePaginatedData<T>(data, params);
    },

    getById: async (id: string): Promise<T> => {
      const response = await apiService.get<ApiResponse<T>>(`${path}/${id}`);
      return unwrapApiResponse(response.data);
    },

    create: async (payload: TCreate): Promise<T> => {
      const response = await apiService.post<ApiResponse<T>, TCreate>(path, payload);
      return unwrapApiResponse(response.data);
    },

    update: async (id: string, payload: TUpdate): Promise<T> => {
      const response = await apiService.put<ApiResponse<T>, TUpdate>(`${path}/${id}`, payload);
      return unwrapApiResponse(response.data);
    },

    remove: async (id: string): Promise<void> => {
      const response = await apiService.delete<ApiResponse<unknown>>(`${path}/${id}`);
      unwrapApiResponse(response.data);
    },
  };
}

export type CatalogService<
  T extends { id: string },
  TCreate,
  TUpdate = Partial<TCreate>,
> = ReturnType<typeof createCatalogService<T, TCreate, TUpdate>>;

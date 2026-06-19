import apiService from '../core';
import { unwrapApiResponse, ApiResponseError } from '../unwrapApiResponse';
import type { ApiResponse } from '@/lib/types/api/api-response';
import type { PaginatedData } from '@/lib/types/api/pagination';
import type { DailyTask, UpdateDailyTaskConfigRequest } from '@/lib/types/catalog/daily-task';

export interface DailyTaskListParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface DailyTaskListResponse {
  isSuccess: boolean;
  message: string;
  data: DailyTask[];
  metaData: null;
}

export type DailyTaskDetailResponse = ApiResponse<DailyTask>;

export const fetchDailyTasks = {
  list: async (params: DailyTaskListParams = {}): Promise<PaginatedData<DailyTask>> => {
    const response = await apiService.get<DailyTaskListResponse>('api/admin/daily-tasks');
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
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          (item.actionSubtype && item.actionSubtype.toLowerCase().includes(q)) ||
          item.cycle.toLowerCase().includes(q)
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

  updateConfig: async (id: string, payload: UpdateDailyTaskConfigRequest): Promise<DailyTask> => {
    const response = await apiService.patch<DailyTaskDetailResponse, UpdateDailyTaskConfigRequest>(
      `api/admin/daily-tasks/${id}/config`,
      payload
    );
    return unwrapApiResponse(response.data);
  },
};

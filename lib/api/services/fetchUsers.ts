import apiService from '../core';
import { unwrapApiResponse, ApiResponseError } from '../unwrapApiResponse';
import type { ApiResponse } from '@/lib/types/api/api-response';
import type { PaginatedData } from '@/lib/types/api/pagination';
import type {
  AdminUser,
  CreateUserRequest,
  UpdateUserRequest,
} from '@/lib/types/admin/user';

export interface UserListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isBanned?: boolean;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface UserListResponseMetaData {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface UserListResponse {
  isSuccess: boolean;
  message: string;
  data: AdminUser[];
  metaData?: UserListResponseMetaData;
}

export type UserDetailResponse = ApiResponse<AdminUser>;
export type CreateUserResponse = ApiResponse<AdminUser>;
export type UpdateUserResponse = ApiResponse<AdminUser>;
export type BanUserResponse = ApiResponse<unknown>;
export type UnbanUserResponse = ApiResponse<unknown>;

export const fetchUsers = {
  list: async (params: UserListParams = {}): Promise<PaginatedData<AdminUser>> => {
    const response = await apiService.get<UserListResponse>('api/user', {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 10,
      search: params.search,
      isBanned: params.isBanned,
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
      pageSize: meta?.pageSize ?? params.pageSize ?? 10,
      totalPages: meta?.totalPages ?? Math.max(1, Math.ceil((meta?.totalItems ?? items.length) / (meta?.pageSize ?? params.pageSize ?? 10))),
    };
  },

  getById: async (userId: string): Promise<AdminUser> => {
    const response = await apiService.get<UserDetailResponse>(`api/user/${userId}`);
    return unwrapApiResponse(response.data);
  },

  create: async (payload: CreateUserRequest): Promise<AdminUser> => {
    const response = await apiService.post<CreateUserResponse, CreateUserRequest>(
      'api/user',
      payload
    );
    return unwrapApiResponse(response.data);
  },

  update: async (userId: string, payload: UpdateUserRequest): Promise<AdminUser> => {
    const response = await apiService.put<UpdateUserResponse, UpdateUserRequest>(
      `api/user/${userId}`,
      payload
    );
    return unwrapApiResponse(response.data);
  },

  ban: async (userId: string): Promise<void> => {
    const response = await apiService.post<BanUserResponse>(`api/user/${userId}/ban`);
    unwrapApiResponse(response.data);
  },

  unban: async (userId: string): Promise<void> => {
    const response = await apiService.post<UnbanUserResponse>(`api/user/${userId}/unban`);
    unwrapApiResponse(response.data);
  },
};

import type { ApiResponse } from './api-response';

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isBanned?: boolean;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface PaginatedData<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages?: number;
}

/** Normalize backend pagination shapes — confirm with live API probe */
export function normalizePaginatedData<T>(
  raw: unknown,
  params: PaginationParams
): PaginatedData<T> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;

  if (Array.isArray(raw)) {
    const all = raw as T[];
    const start = (page - 1) * pageSize;
    const items = all.slice(start, start + pageSize);
    return {
      items,
      totalCount: all.length,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(all.length / pageSize)),
    };
  }

  if (raw && typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    const items =
      (obj.items as T[]) ??
      (obj.data as T[]) ??
      (obj.results as T[]) ??
      (obj.records as T[]) ??
      [];
    const totalCount =
      (obj.totalCount as number) ??
      (obj.total as number) ??
      (obj.count as number) ??
      items.length;
    const resolvedPage = (obj.page as number) ?? (obj.currentPage as number) ?? page;
    const resolvedPageSize = (obj.pageSize as number) ?? (obj.limit as number) ?? pageSize;
    const totalPages =
      (obj.totalPages as number) ??
      (obj.totalPage as number) ??
      Math.max(1, Math.ceil(totalCount / resolvedPageSize));

    return {
      items,
      totalCount,
      page: resolvedPage,
      pageSize: resolvedPageSize,
      totalPages,
    };
  }

  return { items: [], totalCount: 0, page, pageSize, totalPages: 0 };
}

export function unwrapPaginatedResponse<T>(
  response: ApiResponse<unknown>,
  params: PaginationParams
): PaginatedData<T> {
  return normalizePaginatedData<T>(response.data, params);
}

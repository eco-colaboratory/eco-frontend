import type { ApiResponse } from '@/lib/types/api/api-response';

export class ApiResponseError extends Error {
  constructor(
    message: string,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = 'ApiResponseError';
  }
}

export function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  if (!response.isSuccess) {
    throw new ApiResponseError(response.message || 'Request failed', response.data);
  }
  return response.data;
}

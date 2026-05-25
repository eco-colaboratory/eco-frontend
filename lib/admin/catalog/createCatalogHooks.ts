'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { PaginationParams } from '@/lib/types/api/pagination';
import type { CatalogService } from './createCatalogService';
import { useAuthReady } from '@/hooks/useAuthReady';

export interface CatalogEntityConfig<
  T extends { id: string },
  TCreate,
  TUpdate = Partial<TCreate>,
> {
  queryKey: string;
  service: CatalogService<T, TCreate, TUpdate>;
}

export function createCatalogHooks<
  T extends { id: string },
  TCreate,
  TUpdate = Partial<TCreate>,
>(config: CatalogEntityConfig<T, TCreate, TUpdate>) {
  const { queryKey, service } = config;
  const listKey = (params: PaginationParams) => [queryKey, 'list', params] as const;

  function useCatalogList(params: PaginationParams) {
    const { ready, isAuthenticated } = useAuthReady();
    return useQuery({
      queryKey: listKey(params),
      queryFn: () => service.list(params),
      enabled: ready && isAuthenticated,
    });
  }

  function useCatalogCreate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (payload: TCreate) => service.create(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey, 'list'] });
      },
    });
  }

  function useCatalogUpdate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, payload }: { id: string; payload: TUpdate }) =>
        service.update(id, payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey, 'list'] });
      },
    });
  }

  function useCatalogDelete() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => service.remove(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey, 'list'] });
      },
    });
  }

  return {
    useCatalogList,
    useCatalogCreate,
    useCatalogUpdate,
    useCatalogDelete,
    listKey,
  };
}

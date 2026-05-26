'use client';

import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { fetchItems, type ItemListParams } from '@/lib/api/services/fetchItems';
import type { CreateItemRequest, UpdateItemRequest } from '@/lib/types/catalog/item';
import { useAuthReady } from '@/hooks/useAuthReady';

const itemsKey = (params: ItemListParams) => ['admin-items', 'list', params] as const;

export function useItemsList(params: ItemListParams) {
  const { ready, isAuthenticated } = useAuthReady();
  return useQuery({
    queryKey: itemsKey(params),
    queryFn: () => fetchItems.list(params),
    enabled: ready && isAuthenticated,
    placeholderData: keepPreviousData,
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateItemRequest) => fetchItems.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-items', 'list'] });
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateItemRequest }) =>
      fetchItems.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-items', 'list'] });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchItems.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-items', 'list'] });
    },
  });
}

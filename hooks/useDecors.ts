'use client';

import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { fetchDecors, type DecorListParams } from '@/lib/api/services/fetchDecors';
import type { CreateDecorRequest, UpdateDecorRequest } from '@/lib/types/catalog/decor';
import { useAuthReady } from '@/hooks/useAuthReady';

const decorsKey = (params: DecorListParams) => ['admin-decors', 'list', params] as const;

export function useDecorsList(params: DecorListParams) {
  const { ready, isAuthenticated } = useAuthReady();
  return useQuery({
    queryKey: decorsKey(params),
    queryFn: () => fetchDecors.list(params),
    enabled: ready && isAuthenticated,
    placeholderData: keepPreviousData,
  });
}

export function useCreateDecor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateDecorRequest) => fetchDecors.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-decors', 'list'] });
    },
  });
}

export function useUpdateDecor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateDecorRequest }) =>
      fetchDecors.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-decors', 'list'] });
    },
  });
}

export function useDeleteDecor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchDecors.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-decors', 'list'] });
    },
  });
}

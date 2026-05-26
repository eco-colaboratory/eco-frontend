'use client';

import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { fetchSynergies, type SynergyListParams } from '@/lib/api/services/fetchSynergies';
import type { CreateSynergyRequest, UpdateSynergyRequest } from '@/lib/types/catalog/synergy';
import { useAuthReady } from '@/hooks/useAuthReady';

const synergiesKey = (params: SynergyListParams) => ['admin-synergies', 'list', params] as const;

export function useSynergiesList(params: SynergyListParams) {
  const { ready, isAuthenticated } = useAuthReady();
  return useQuery({
    queryKey: synergiesKey(params),
    queryFn: () => fetchSynergies.list(params),
    enabled: ready && isAuthenticated,
    placeholderData: keepPreviousData,
  });
}

export function useCreateSynergy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSynergyRequest) => fetchSynergies.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-synergies', 'list'] });
    },
  });
}

export function useUpdateSynergy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateSynergyRequest }) =>
      fetchSynergies.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-synergies', 'list'] });
    },
  });
}

export function useDeleteSynergy() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchSynergies.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-synergies', 'list'] });
    },
  });
}

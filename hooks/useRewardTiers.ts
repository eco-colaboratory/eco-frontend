'use client';

import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { fetchRewardTiers, type RewardTierListParams } from '@/lib/api/services/fetchRewardTiers';
import type { CreateRewardTierRequest, UpdateRewardTierRequest } from '@/lib/types/catalog/reward-tier';
import { useAuthReady } from '@/hooks/useAuthReady';

const rewardTiersKey = (params: RewardTierListParams) => ['admin-reward-tiers', 'list', params] as const;

export function useRewardTiersList(params: RewardTierListParams) {
  const { ready, isAuthenticated } = useAuthReady();
  return useQuery({
    queryKey: rewardTiersKey(params),
    queryFn: () => fetchRewardTiers.list(params),
    enabled: ready && isAuthenticated,
    placeholderData: keepPreviousData,
  });
}

export function useCreateRewardTier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateRewardTierRequest) => fetchRewardTiers.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reward-tiers', 'list'] });
    },
  });
}

export function useUpdateRewardTier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateRewardTierRequest }) =>
      fetchRewardTiers.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reward-tiers', 'list'] });
    },
  });
}

export function useDeleteRewardTier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchRewardTiers.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reward-tiers', 'list'] });
    },
  });
}

'use client';

import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { fetchGiftCodes, type GiftCodeListParams } from '@/lib/api/services/fetchGiftCodes';
import type { CreateGiftCodeRequest, UpdateGiftCodeRequest } from '@/lib/types/catalog/gift-code';
import { useAuthReady } from '@/hooks/useAuthReady';

const giftCodesKey = (params: GiftCodeListParams) => ['admin-gift-codes', 'list', params] as const;

export function useGiftCodesList(params: GiftCodeListParams) {
  const { ready, isAuthenticated } = useAuthReady();
  return useQuery({
    queryKey: giftCodesKey(params),
    queryFn: () => fetchGiftCodes.list(params),
    enabled: ready && isAuthenticated,
    placeholderData: keepPreviousData,
  });
}

export function useCreateGiftCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateGiftCodeRequest) => fetchGiftCodes.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gift-codes', 'list'] });
    },
  });
}

export function useUpdateGiftCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateGiftCodeRequest }) =>
      fetchGiftCodes.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gift-codes', 'list'] });
    },
  });
}

export function useUpdateGiftCodeStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      fetchGiftCodes.updateStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gift-codes', 'list'] });
    },
  });
}

export function useDeleteGiftCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchGiftCodes.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gift-codes', 'list'] });
    },
  });
}

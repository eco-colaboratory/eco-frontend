'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCoinPackages } from '@/lib/api/services/fetchCoinPackages';
import type { CreateCoinPackageRequest, UpdateCoinPackageRequest } from '@/lib/types/catalog/coin-package';
import { useAuthReady } from '@/hooks/useAuthReady';

const coinPackagesKey = ['admin-coin-packages'] as const;

export function useCoinPackagesList() {
  const { ready, isAuthenticated } = useAuthReady();
  return useQuery({
    queryKey: coinPackagesKey,
    queryFn: () => fetchCoinPackages.list(),
    enabled: ready && isAuthenticated,
  });
}

export function useCreateCoinPackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCoinPackageRequest) => fetchCoinPackages.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coinPackagesKey });
      queryClient.invalidateQueries({ queryKey: ['admin-shop-catalog'] });
    },
  });
}

export function useUpdateCoinPackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCoinPackageRequest }) =>
      fetchCoinPackages.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coinPackagesKey });
      queryClient.invalidateQueries({ queryKey: ['admin-shop-catalog'] });
    },
  });
}

export function useUpdateCoinPackageStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      fetchCoinPackages.updateStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coinPackagesKey });
      queryClient.invalidateQueries({ queryKey: ['admin-shop-catalog'] });
    },
  });
}

export function useDeleteCoinPackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchCoinPackages.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coinPackagesKey });
      queryClient.invalidateQueries({ queryKey: ['admin-shop-catalog'] });
    },
  });
}

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchShopCatalog } from '@/lib/api/services/fetchShopCatalog';
import { useAuthReady } from '@/hooks/useAuthReady';

const shopCatalogKey = ['admin-shop-catalog'] as const;

export function useShopCatalog() {
  const { ready, isAuthenticated } = useAuthReady();
  return useQuery({
    queryKey: shopCatalogKey,
    queryFn: () => fetchShopCatalog.list(),
    enabled: ready && isAuthenticated,
  });
}

export function useUpdateShopPrice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ prefixedId, price }: { prefixedId: string; price: number }) =>
      fetchShopCatalog.updatePrice(prefixedId, price),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shopCatalogKey });
      queryClient.invalidateQueries({ queryKey: ['admin-coin-packages'] });
    },
  });
}

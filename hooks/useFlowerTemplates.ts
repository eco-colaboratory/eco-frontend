'use client';

import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { fetchFlowerTemplates, type FlowerTemplateListParams } from '@/lib/api/services/fetchFlowerTemplates';
import type { CreateFlowerTemplateRequest, UpdateFlowerTemplateRequest } from '@/lib/types/catalog/flower-template';
import { useAuthReady } from '@/hooks/useAuthReady';

const flowerTemplatesKey = (params: FlowerTemplateListParams) => ['admin-flower-templates', 'list', params] as const;

export function useFlowerTemplatesList(params: FlowerTemplateListParams) {
  const { ready, isAuthenticated } = useAuthReady();
  return useQuery({
    queryKey: flowerTemplatesKey(params),
    queryFn: () => fetchFlowerTemplates.list(params),
    enabled: ready && isAuthenticated,
    placeholderData: keepPreviousData,
  });
}

export function useCreateFlowerTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateFlowerTemplateRequest) => fetchFlowerTemplates.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-flower-templates', 'list'] });
      // Cũng cần invalidate synergies vì nó hiển thị hoa
      queryClient.invalidateQueries({ queryKey: ['admin-synergies', 'list'] });
    },
  });
}

export function useUpdateFlowerTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateFlowerTemplateRequest }) =>
      fetchFlowerTemplates.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-flower-templates', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['admin-synergies', 'list'] });
    },
  });
}

export function useDeleteFlowerTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fetchFlowerTemplates.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-flower-templates', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['admin-synergies', 'list'] });
    },
  });
}

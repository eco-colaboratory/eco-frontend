'use client';

import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { fetchDailyTasks, type DailyTaskListParams } from '@/lib/api/services/fetchDailyTasks';
import type { UpdateDailyTaskConfigRequest } from '@/lib/types/catalog/daily-task';
import { useAuthReady } from '@/hooks/useAuthReady';

const dailyTasksKey = (params: DailyTaskListParams) => ['admin-daily-tasks', 'list', params] as const;

export function useDailyTasksList(params: DailyTaskListParams) {
  const { ready, isAuthenticated } = useAuthReady();
  return useQuery({
    queryKey: dailyTasksKey(params),
    queryFn: () => fetchDailyTasks.list(params),
    enabled: ready && isAuthenticated,
    placeholderData: keepPreviousData,
  });
}

export function useUpdateDailyTaskConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateDailyTaskConfigRequest }) =>
      fetchDailyTasks.updateConfig(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-daily-tasks', 'list'] });
    },
  });
}

'use client';

import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { fetchUsers, type UserListParams } from '@/lib/api/services/fetchUsers';
import type { CreateUserRequest, UpdateUserRequest } from '@/lib/types/admin/user';
import { useAuthReady } from '@/hooks/useAuthReady';

const usersKey = (params: UserListParams) => ['admin-users', 'list', params] as const;

export function useUsersList(params: UserListParams) {
  const { ready, isAuthenticated } = useAuthReady();
  return useQuery({
    queryKey: usersKey(params),
    queryFn: () => fetchUsers.list(params),
    enabled: ready && isAuthenticated,
    placeholderData: keepPreviousData,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserRequest) => fetchUsers.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users', 'list'] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserRequest }) =>
      fetchUsers.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users', 'list'] });
    },
  });
}

export function useBanUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => fetchUsers.ban(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users', 'list'] });
    },
  });
}

export function useUnbanUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => fetchUsers.unban(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users', 'list'] });
    },
  });
}

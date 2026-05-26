'use client';

import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowDown, ArrowUpDown } from 'lucide-react';


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MotionTableBody } from '@/components/admin/motion-table-body';
import { MotionTableRow, motionTableRowProps } from '@/components/admin/motion-table-row';
import { AdminFadeIn } from '@/components/admin/admin-fade-in';
import { DataTableShell } from '@/components/data-table/data-table-shell';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { PageHeader } from '@/components/layout/page-header';
import { useAppSelector } from '@/lib/redux/hooks';
import { selectUser } from '@/lib/redux/slices/authSlice';
import type { AdminUser } from '@/lib/types/admin/user';
import { useUsersList } from '@/hooks/admin/useUsers';
import { AdminPagination } from '@/components/admin/shared/admin-pagination';
import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { AdminEmptyState } from '@/components/admin/shared/admin-empty-state';
import { AdminErrorState } from '@/components/admin/shared/admin-error-state';
import { UserRowActions } from './user-row-actions';
import { useUsersPage } from './users-provider';
import { UsersPrimaryButtons } from './users-primary-buttons';
import { UserStatusBadge } from './user-status-badge';
import { UserRoleCell } from './user-role-cell';

const PAGE_SIZE = 10;

function displayName(user: AdminUser) {
  const parts = [user.firstName, user.lastName].filter(Boolean);
  return parts.length > 0 ? parts.join(' ') : '—';
}

/** v1 bridge table — upgrade to TanStack DataTable kit in v2 */
export function UsersTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentAdmin = useAppSelector(selectUser);
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const { openCreate, openEdit, setBanTarget } = useUsersPage();

  const [filter, setFilter] = useState('');
  const [isBannedFilter, setIsBannedFilter] = useState<'all' | 'active' | 'banned'>('all');

  const handleStatusChange = useCallback((val: string) => {
    setIsBannedFilter(val as 'all' | 'active' | 'banned');
  }, []);

  const isBannedParam = isBannedFilter === 'all' ? undefined : isBannedFilter === 'banned';

  const { data, isLoading, isError, error, refetch } = useUsersList({
    page,
    pageSize: PAGE_SIZE,
    search: filter,
    isBanned: isBannedParam,
  });

  const setPage = useCallback(
    (next: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(next));
      router.push(`/admin/users?${params.toString()}`);
    },
    [router, searchParams]
  );

  const filteredItems = data?.items ?? [];

  const totalPages = data?.totalPages ?? Math.max(1, Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE));

  return (
    <div className="flex flex-1 flex-col gap-6">
      <AdminFadeIn>
        <PageHeader
          title="Danh sách người dùng"
          description="Quản lý người dùng và vai trò của họ tại đây."
        >
          <UsersPrimaryButtons />
        </PageHeader>
      </AdminFadeIn>

      {isLoading ? <AdminTableSkeleton showHeader={false} /> : null}
      {isError ? (
        <AdminErrorState
          message={error instanceof Error ? error.message : 'Không tải được danh sách'}
          onRetry={() => void refetch()}
        />
      ) : null}

      {!isLoading && !isError && data ? (
        <DataTableShell>
          <div className="space-y-4 p-4">
            <DataTableToolbar
              searchPlaceholder="Tìm kiếm người dùng…"
              searchValue={filter}
              onSearchChange={setFilter}
              showStatusFilter
              statusValue={isBannedFilter}
              onStatusChange={handleStatusChange}
            />
          </div>
          
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 border-t border-border text-center">
              <p className="text-sm font-semibold text-muted-foreground">Không tìm thấy người dùng phù hợp</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Vui lòng kiểm tra lại từ khóa tìm kiếm hoặc bộ lọc trạng thái.</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent h-[calc(50vh/10)]">
                    <TableHead className="text-muted-foreground py-0 h-full">Tên đăng nhập</TableHead>
                    <TableHead className="text-muted-foreground py-0 h-full">Tên hiển thị</TableHead>
                    <TableHead className="text-muted-foreground py-0 h-full">Email</TableHead>
                    <TableHead className="text-muted-foreground text-center py-0 h-full">Cấp độ</TableHead>
                    <TableHead className="text-muted-foreground text-right py-0 h-full">Số dư xu</TableHead>
                    <TableHead className="text-muted-foreground py-0 h-full">Trạng thái</TableHead>
                    <TableHead className="text-muted-foreground py-0 h-full">Vai trò</TableHead>
                    <TableHead className="w-12 py-0 h-full">
                      <span className="sr-only">Hành động</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <MotionTableBody motionKey={`${page}-${filter}-${filteredItems.length}`}>
                  {filteredItems.map((row) => {
                    const isSelf = row.id === currentAdmin?.id;
                    return (
                      <MotionTableRow
                        key={row.id}
                        {...motionTableRowProps}
                        className="h-[calc(70vh/11)] hover:bg-transparent"
                      >
                        <TableCell className="font-medium py-0">{row.username}</TableCell>
                        <TableCell className="text-muted-foreground py-0">{displayName(row)}</TableCell>
                        <TableCell className="py-0">{row.email ?? '—'}</TableCell>
                        <TableCell className="text-center font-semibold py-0">Lv.{row.level ?? 1}</TableCell>
                        <TableCell className="text-right font-medium text-amber-600 dark:text-amber-500 py-0">
                          {(row.currency ?? 0).toLocaleString('vi-VN')} xu
                        </TableCell>
                        <TableCell className="py-0">
                          <UserStatusBadge isBanned={row.isBanned} />
                        </TableCell>
                        <TableCell className="py-0">
                          <UserRoleCell role={row.role} />
                        </TableCell>
                        <TableCell className="py-0">
                          <UserRowActions
                            isBanned={!!row.isBanned}
                            disableBan={isSelf}
                            onEdit={() => openEdit(row)}
                            onBanToggle={() => setBanTarget(row)}
                          />
                        </TableCell>
                      </MotionTableRow>
                    );
                  })}
                </MotionTableBody>
              </Table>
              <div className="border-t border-border px-4 py-3">
                <AdminPagination
                  page={page}
                  totalPages={totalPages}
                  totalCount={data.totalCount}
                  pageSize={PAGE_SIZE}
                  onPageChange={setPage}
                  disabled={isLoading}
                />
              </div>
            </>
          )}
        </DataTableShell>
      ) : null}
    </div>
  );
}

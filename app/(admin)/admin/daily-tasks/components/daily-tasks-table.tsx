'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { MotionTableBody } from '@/components/admin/motion-table-body';
import { MotionTableRow, motionTableRowProps } from '@/components/admin/motion-table-row';
import { AdminFadeIn } from '@/components/admin/admin-fade-in';
import { DataTableShell } from '@/components/data-table/data-table-shell';
import { PageHeader } from '@/components/layout/page-header';
import { useDailyTasksList } from '@/hooks/useDailyTasks';
import { useItemsList } from '@/hooks/useItems';
import { AdminPagination } from '@/components/admin/shared/admin-pagination';
import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { AdminErrorState } from '@/components/admin/shared/admin-error-state';
import { useDebounce } from '@/hooks/useDebounce';
import { DailyTaskRowActions } from './daily-task-row-actions';
import { useDailyTasksPage } from './daily-tasks-provider';

const PAGE_SIZE = 8;

export function DailyTasksTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const { openEdit } = useDailyTasksPage();

  const [filter, setFilter] = React.useState('');
  const debouncedFilter = useDebounce(filter, 300);

  const { data, isLoading, isFetching, isError, error, refetch } = useDailyTasksList({
    page,
    pageSize: PAGE_SIZE,
    search: debouncedFilter,
  });

  // Fetch items to map rewardItemId to Item Name
  const { data: itemsData } = useItemsList({ page: 1, pageSize: 100 });
  const itemsMap = React.useMemo(() => {
    const map = new Map<string, string>();
    itemsData?.items.forEach((item) => {
      map.set(item.id, item.name);
    });
    return map;
  }, [itemsData]);

  const setPage = React.useCallback(
    (next: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(next));
      router.push(`/admin/daily-tasks?${params.toString()}`);
    },
    [router, searchParams]
  );

  const filteredItems = data?.items ?? [];
  const totalPages = data?.totalPages ?? Math.max(1, Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE));

  return (
    <div className="flex flex-1 flex-col gap-6">
      <AdminFadeIn>
        <PageHeader
          title="Cấu hình Nhiệm vụ"
          description="Quản lý cấu hình mục tiêu (số lần/phút) và phần thưởng (XP, Xu, Vật phẩm) của các nhiệm vụ hàng ngày và hàng tuần."
        />
      </AdminFadeIn>

      <DataTableShell>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
            <Input
              placeholder="Tìm kiếm nhiệm vụ, loại, chu kỳ…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-9 pl-9 border-border bg-background shadow-none"
            />
          </div>
        </div>

        {isLoading ? (
          <AdminTableSkeleton showHeader={false} />
        ) : isError ? (
          <div className="p-4">
            <AdminErrorState
              message={error instanceof Error ? error.message : 'Không tải được danh sách nhiệm vụ'}
              onRetry={() => void refetch()}
            />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 border-t border-border text-center">
            <p className="text-sm font-semibold text-muted-foreground">Không tìm thấy nhiệm vụ phù hợp</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Vui lòng kiểm tra lại từ khóa tìm kiếm.</p>
          </div>
        ) : (
          <>
            <div className={isFetching ? 'opacity-60 transition-opacity duration-200' : 'transition-opacity duration-200'}>
              {/* Desktop view */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent h-[calc(50vh/10)]">
                      <TableHead className="text-muted-foreground py-0 h-full">Nhiệm vụ</TableHead>
                      <TableHead className="text-muted-foreground text-center py-0 h-full">Chu kỳ</TableHead>
                      <TableHead className="text-muted-foreground text-center py-0 h-full">Mục tiêu (Target)</TableHead>
                      <TableHead className="text-muted-foreground text-center py-0 h-full">Xu thưởng</TableHead>
                      <TableHead className="text-muted-foreground text-center py-0 h-full">XP thưởng</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full">Vật phẩm thưởng</TableHead>
                      <TableHead className="w-12 py-0 h-full">
                        <span className="sr-only">Hành động</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <MotionTableBody motionKey={`${page}-${debouncedFilter}-${filteredItems.length}`}>
                    {filteredItems.map((row) => (
                      <MotionTableRow
                        key={row.id}
                        {...motionTableRowProps}
                        className="h-[calc(70vh/11)] hover:bg-transparent"
                      >
                        <TableCell className="py-2">
                          <div className="font-semibold text-foreground">{row.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{row.description}</div>
                        </TableCell>
                        <TableCell className="text-center py-2">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                            row.cycle === 'DAILY' 
                              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                              : 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                          }`}>
                            {row.cycle}
                          </span>
                        </TableCell>
                        <TableCell className="text-center font-medium py-2">
                          {row.target} {row.type === 'ONLINE_TIME' ? 'phút' : 'lần'}
                        </TableCell>
                        <TableCell className="text-center font-medium text-amber-600 dark:text-amber-500 py-2">
                          {row.rewardCurrency} xu
                        </TableCell>
                        <TableCell className="text-center font-medium text-blue-600 dark:text-blue-500 py-2">
                          +{row.rewardXP} XP
                        </TableCell>
                        <TableCell className="py-2 text-sm">
                          {row.rewardItemId && row.rewardItemId !== 'null' ? (
                            <span className="font-medium text-emerald-600 dark:text-emerald-400">
                              {itemsMap.get(row.rewardItemId) || 'Vật phẩm'} (x{row.rewardItemQty})
                            </span>
                          ) : (
                            <span className="text-muted-foreground/60">Không có</span>
                          )}
                        </TableCell>
                        <TableCell className="py-2">
                          <DailyTaskRowActions onEdit={() => openEdit(row)} />
                        </TableCell>
                      </MotionTableRow>
                    ))}
                  </MotionTableBody>
                </Table>
              </div>

              {/* Mobile view */}
              <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                {filteredItems.map((row) => (
                  <div
                    key={row.id}
                    className="relative flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex-1 min-w-0 pr-6 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-foreground truncate">{row.title}</h4>
                        <span className={`inline-flex items-center rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                          row.cycle === 'DAILY' 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'bg-purple-50 text-purple-700'
                        }`}>
                          {row.cycle}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{row.description}</p>
                      
                      <div className="pt-2 flex items-center gap-4 text-xs font-semibold flex-wrap">
                        <span className="text-foreground">Mục tiêu: {row.target} {row.type === 'ONLINE_TIME' ? 'phút' : 'lần'}</span>
                        <span className="text-amber-600">{row.rewardCurrency} xu</span>
                        <span className="text-blue-600">+{row.rewardXP} XP</span>
                        {row.rewardItemId && row.rewardItemId !== 'null' && (
                          <span className="text-emerald-600">
                            {itemsMap.get(row.rewardItemId) || 'Vật phẩm'} (x{row.rewardItemQty})
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="absolute right-2 top-2">
                      <DailyTaskRowActions onEdit={() => openEdit(row)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-border px-4 py-3">
              <AdminPagination
                page={page}
                totalPages={totalPages}
                totalCount={data?.totalCount ?? 0}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
                disabled={isLoading || isFetching}
              />
            </div>
          </>
        )}
      </DataTableShell>
    </div>
  );
}

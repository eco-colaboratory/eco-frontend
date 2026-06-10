'use client';

import { useCallback, useState } from 'react';
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
import { useRewardTiersList } from '@/hooks/useRewardTiers';
import { AdminPagination } from '@/components/admin/shared/admin-pagination';
import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { AdminErrorState } from '@/components/admin/shared/admin-error-state';
import { useDebounce } from '@/hooks/useDebounce';
import { RewardTierRowActions } from './reward-tier-row-actions';
import { useRewardTiersPage } from './reward-tiers-provider';
import { RewardTiersPrimaryButtons } from './reward-tiers-primary-buttons';

const PAGE_SIZE = 8;

export function RewardTiersTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const { openEdit, setDeleteTarget } = useRewardTiersPage();

  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounce(filter, 300);

  const { data, isLoading, isFetching, isError, error, refetch } = useRewardTiersList({
    page,
    pageSize: PAGE_SIZE,
    search: debouncedFilter,
  });

  const setPage = useCallback(
    (next: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(next));
      router.push(`/admin/reward-tiers?${params.toString()}`);
    },
    [router, searchParams]
  );

  const filteredItems = data?.items ?? [];
  const totalPages = data?.totalPages ?? Math.max(1, Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE));

  return (
    <div className="flex flex-1 flex-col gap-6">
      <AdminFadeIn>
        <PageHeader
          title="Mốc thưởng Focus"
          description="Thiết lập các mốc thời gian tập trung tối thiểu và phần thưởng tương ứng (Bình tưới, Phân bón) nhận được khi hoàn thành Focus Session."
        >
          <RewardTiersPrimaryButtons />
        </PageHeader>
      </AdminFadeIn>

      <DataTableShell>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
            <Input
              placeholder="Tìm kiếm mốc thời gian, phần thưởng…"
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
              message={error instanceof Error ? error.message : 'Không tải được danh sách mốc thưởng'}
              onRetry={() => void refetch()}
            />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 border-t border-border text-center">
            <p className="text-sm font-semibold text-muted-foreground">Không tìm thấy mốc thưởng phù hợp</p>
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
                      <TableHead className="text-muted-foreground py-0 h-full">Mốc thời gian tập trung</TableHead>
                      <TableHead className="text-muted-foreground text-center py-0 h-full">Số lượng bình tưới</TableHead>
                      <TableHead className="text-muted-foreground text-center py-0 h-full">Số lượng phân bón</TableHead>
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
                        <TableCell className="font-semibold py-0">Từ {row.minMinutes} phút trở lên</TableCell>
                        <TableCell className="text-center font-medium text-emerald-600 dark:text-emerald-500 py-0">
                          {row.wateringCanQty} bình tưới
                        </TableCell>
                        <TableCell className="text-center font-medium text-blue-600 dark:text-blue-500 py-0">
                          {row.fertilizerQty} phân bón
                        </TableCell>
                        <TableCell className="py-0">
                          <RewardTierRowActions
                            onEdit={() => openEdit(row)}
                            onDelete={() => setDeleteTarget(row)}
                          />
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
                      <h4 className="font-bold text-sm text-foreground truncate">Từ {row.minMinutes} phút trở lên</h4>
                      <div className="flex items-center gap-3 text-xs font-semibold flex-wrap">
                        <span className="text-emerald-600">{row.wateringCanQty} Bình tưới</span>
                        <span className="text-muted-foreground/60">•</span>
                        <span className="text-blue-600">{row.fertilizerQty} Phân bón</span>
                      </div>
                    </div>

                    <div className="absolute right-2 top-2">
                      <RewardTierRowActions
                        onEdit={() => openEdit(row)}
                        onDelete={() => setDeleteTarget(row)}
                      />
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

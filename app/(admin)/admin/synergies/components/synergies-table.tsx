'use client';

import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PlusCircle, Search } from 'lucide-react';

import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MotionTableBody } from '@/components/admin/motion-table-body';
import { MotionTableRow, motionTableRowProps } from '@/components/admin/motion-table-row';
import { AdminFadeIn } from '@/components/admin/admin-fade-in';
import { DataTableShell } from '@/components/data-table/data-table-shell';
import { PageHeader } from '@/components/layout/page-header';
import { useSynergiesList } from '@/hooks/useSynergies';
import { AdminPagination } from '@/components/admin/shared/admin-pagination';
import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { AdminErrorState } from '@/components/admin/shared/admin-error-state';
import { useDebounce } from '@/hooks/useDebounce';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SynergyRowActions } from './synergy-row-actions';
import { useSynergiesPage } from './synergies-provider';
import { SynergiesPrimaryButtons } from './synergies-primary-buttons';
import { SafeImage } from '@/components/ui/safeImage copy';

const PAGE_SIZE = 8;

function SynergyStatusBadge({ isDeleted }: { isDeleted?: boolean }) {
  if (isDeleted) {
    return (
      <Badge
        className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-50 font-medium px-2.5 py-0.5 rounded-full dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20 shadow-none"
      >
        Đã xóa
      </Badge>
    );
  }

  return (
    <Badge
      className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 font-medium px-2.5 py-0.5 rounded-full dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 shadow-none"
    >
      Hoạt động
    </Badge>
  );
}

export function SynergiesTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const { openEdit, setDeleteTarget } = useSynergiesPage();

  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'deleted'>('all');

  const debouncedFilter = useDebounce(filter, 300);

  const handleStatusChange = useCallback((val: string) => {
    setStatusFilter(val as 'all' | 'active' | 'deleted');
  }, []);

  const isDeletedParam = statusFilter === 'all' ? undefined : statusFilter === 'deleted';

  const { data, isLoading, isFetching, isError, error, refetch } = useSynergiesList({
    page,
    pageSize: PAGE_SIZE,
    search: debouncedFilter,
    isDeleted: isDeletedParam,
  });

  const setPage = useCallback(
    (next: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(next));
      router.push(`/admin/synergies?${params.toString()}`);
    },
    [router, searchParams]
  );

  const filteredItems = data?.items ?? [];
  const totalPages = data?.totalPages ?? Math.max(1, Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE));

  return (
    <div className="flex flex-1 flex-col gap-6">
      <AdminFadeIn>
        <PageHeader
          title="Danh sách hệ sinh thái"
          description="Quản lý các mối quan hệ hệ sinh thái hỗ trợ lẫn nhau của các loài hoa trong game tại đây."
        >
          <SynergiesPrimaryButtons />
        </PageHeader>
      </AdminFadeIn>

      <DataTableShell>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
            <Input
              placeholder="Tìm kiếm hệ sinh thái…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-9 pl-9 border-border bg-background shadow-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="h-9 w-[170px] border-dashed shadow-none">
                <PlusCircle className="mr-2 h-4 w-4 opacity-50" />
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="deleted">Đã xóa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <AdminTableSkeleton showHeader={false} />
        ) : isError ? (
          <div className="p-4">
            <AdminErrorState
              message={error instanceof Error ? error.message : 'Không tải được danh sách hệ sinh thái'}
              onRetry={() => void refetch()}
            />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 border-t border-border text-center">
            <p className="text-sm font-semibold text-muted-foreground">Không tìm thấy hệ sinh thái phù hợp</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Vui lòng kiểm tra lại từ khóa tìm kiếm hoặc bộ lọc.</p>
          </div>
        ) : (
          <>
            <div className={isFetching ? 'opacity-60 transition-opacity duration-200' : 'transition-opacity duration-200'}>
              {/* Desktop view */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent h-[calc(50vh/10)]">
                      <TableHead className="text-muted-foreground py-0 h-full">Tên hệ sinh thái</TableHead>
                      <TableHead className="text-muted-foreground text-center py-0 h-full">EXP cộng thêm</TableHead>
                      <TableHead className="text-muted-foreground text-center py-0 h-full">Giảm hồi (giây)</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full">Mẫu hoa liên kết</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full">Trạng thái</TableHead>
                      <TableHead className="w-12 py-0 h-full">
                        <span className="sr-only">Hành động</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <MotionTableBody motionKey={`${page}-${debouncedFilter}-${statusFilter}-${filteredItems.length}`}>
                    {filteredItems.map((row) => (
                      <MotionTableRow
                        key={row.id}
                        {...motionTableRowProps}
                        className="h-[calc(70vh/11)] hover:bg-transparent"
                      >
                        <TableCell className="font-semibold py-0">{row.name}</TableCell>
                        <TableCell className="text-center font-medium text-emerald-600 dark:text-emerald-500 py-0">
                          +{row.xpPlus} EXP
                        </TableCell>
                        <TableCell className="text-center font-medium text-blue-600 dark:text-blue-500 py-0">
                          -{row.cooldownMinus}s
                        </TableCell>
                        <TableCell className="py-0">
                          {row.flowerTemplates && row.flowerTemplates.length > 0 ? (
                            <div className="flex items-center -space-x-1.5 overflow-hidden">
                              <TooltipProvider>
                                {row.flowerTemplates.map((flower) => (
                                  <Tooltip key={flower.id}>
                                    <TooltipTrigger asChild>
                                      <div className="inline-block relative">
                                        <SafeImage
                                          src={flower.imageUrl}
                                          alt={flower.name}
                                          className="h-8 w-8 rounded-full border-2 border-background bg-muted object-cover shadow-sm transition-all duration-200 hover:scale-110 hover:z-10 cursor-pointer"
                                        />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-xs font-semibold">{flower.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                ))}
                              </TooltipProvider>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground/60">Không có mẫu hoa</span>
                          )}
                        </TableCell>
                        <TableCell className="py-0">
                          <SynergyStatusBadge isDeleted={row.isDeleted} />
                        </TableCell>
                        <TableCell className="py-0">
                          <SynergyRowActions
                            isDeleted={!!row.isDeleted}
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
                      <h4 className="font-bold text-sm text-foreground truncate">{row.name}</h4>
                      <div className="flex items-center gap-2 text-xs font-semibold flex-wrap">
                        <span className="text-emerald-600">+{row.xpPlus} EXP</span>
                        <span className="text-muted-foreground/60">•</span>
                        <span className="text-blue-600">-{row.cooldownMinus}s hồi</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-border/40 pt-2 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-semibold text-muted-foreground">Liên kết:</span>
                        {row.flowerTemplates && row.flowerTemplates.length > 0 ? (
                          <div className="flex items-center -space-x-1.5 overflow-hidden">
                            <TooltipProvider>
                              {row.flowerTemplates.map((flower) => (
                                <Tooltip key={flower.id}>
                                  <TooltipTrigger asChild>
                                    <div className="inline-block relative">
                                      <SafeImage
                                        src={flower.imageUrl}
                                        alt={flower.name}
                                        className="h-7 w-7 rounded-full border-2 border-background bg-muted object-cover shadow-sm transition-all duration-200 hover:scale-110"
                                      />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs font-semibold">{flower.name}</p>
                                  </TooltipContent>
                                </Tooltip>
                              ))}
                            </TooltipProvider>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground/60">Không có</span>
                        )}
                      </div>

                      <div>
                        <SynergyStatusBadge isDeleted={row.isDeleted} />
                      </div>
                    </div>

                    <div className="absolute right-2 top-2">
                      <SynergyRowActions
                        isDeleted={!!row.isDeleted}
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

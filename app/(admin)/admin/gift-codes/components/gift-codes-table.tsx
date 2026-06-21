'use client';

import { useCallback, useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PlusCircle, Search, Ticket } from 'lucide-react';
import { toast } from 'sonner';

import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
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
import { useGiftCodesList, useUpdateGiftCodeStatus } from '@/hooks/useGiftCodes';
import { useItemsList } from '@/hooks/useItems';
import { useFlowerTemplatesList } from '@/hooks/useFlowerTemplates';
import { useDecorsList } from '@/hooks/useDecors';
import { AdminPagination } from '@/components/admin/shared/admin-pagination';
import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { AdminErrorState } from '@/components/admin/shared/admin-error-state';
import { useDebounce } from '@/hooks/useDebounce';
import { GiftCodeRowActions } from './gift-code-row-actions';
import { useGiftCodesPage } from './gift-codes-provider';
import { GiftCodesPrimaryButtons } from './gift-codes-primary-buttons';

const PAGE_SIZE = 8;

export function GiftCodesTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const { openEdit, setDeleteTarget } = useGiftCodesPage();
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNow(Date.now());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const debouncedFilter = useDebounce(filter, 300);

  const handleStatusChange = useCallback((val: string) => {
    setStatusFilter(val as 'all' | 'active' | 'inactive');
  }, []);

  const isActiveParam = statusFilter === 'all' ? undefined : statusFilter === 'active';

  // Load danh sách phụ trợ để ánh xạ refId -> tên hiển thị
  const { data: itemsData } = useItemsList({ page: 1, pageSize: 100 });
  const { data: flowerTemplatesData } = useFlowerTemplatesList({ page: 1, pageSize: 100 });
  const { data: decorsData } = useDecorsList({ page: 1, pageSize: 100 });

  const itemsList = useMemo(() => itemsData?.items ?? [], [itemsData]);
  const flowerTemplatesList = useMemo(() => flowerTemplatesData?.items ?? [], [flowerTemplatesData]);
  const decorsList = useMemo(() => decorsData?.items ?? [], [decorsData]);

  // Fetch danh sách gift code chính
  const { data, isLoading, isFetching, isError, error, refetch } = useGiftCodesList({
    page,
    pageSize: PAGE_SIZE,
    search: debouncedFilter,
    isActive: isActiveParam,
  });

  const updateStatusMutation = useUpdateGiftCodeStatus();

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateStatusMutation.mutateAsync({ id, isActive: !currentStatus });
      toast.success(`Đã ${!currentStatus ? 'kích hoạt' : 'tạm ngưng'} mã Gift Code`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Không cập nhật được trạng thái');
    }
  };

  const setPage = useCallback(
    (next: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(next));
      router.push(`/admin/gift-codes?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Ánh xạ refId -> Tên hiển thị
  const getRewardName = useCallback((rewardType: number, refId: string | null | undefined): string => {
    if (rewardType === 0) return 'xu';
    if (!refId) return 'Không xác định';

    if (rewardType === 1) {
      const item = itemsList.find((i) => i.id === refId);
      return item ? item.name : 'Vật phẩm';
    }
    if (rewardType === 2) {
      const seed = flowerTemplatesList.find((s) => s.id === refId);
      return seed ? seed.name : 'Mẫu hoa';
    }
    if (rewardType === 3) {
      const decor = decorsList.find((d) => d.id === refId);
      return decor ? decor.name : 'Đồ trang trí';
    }
    return 'Quà tặng';
  }, [itemsList, flowerTemplatesList, decorsList]);

  const getRewardBadgeColor = (rewardType: number): string => {
    switch (rewardType) {
      case 0:
        return 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
      case 1:
        return 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
      case 2:
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
      case 3:
        return 'bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const isExpired = (expiryDateStr: string) => {
    if (now === 0) return false;
    return new Date(expiryDateStr).getTime() < now;
  };

  const filteredItems = data?.items ?? [];
  const totalPages = data?.totalPages ?? Math.max(1, Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE));

  return (
    <div className="flex flex-1 flex-col gap-6">
      <AdminFadeIn>
        <PageHeader
          title="Quản lý Gift Code"
          description="Tạo và quản lý các mã khuyến mãi phát thưởng cho người chơi."
        >
          <GiftCodesPrimaryButtons />
        </PageHeader>
      </AdminFadeIn>

      <DataTableShell>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
            <Input
              placeholder="Tìm kiếm mã Gift Code…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-9 pl-9 border-border bg-background shadow-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="h-9 w-[180px] border-dashed shadow-none">
                <PlusCircle className="mr-2 h-4 w-4 opacity-50" />
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="inactive">Đang tạm ngưng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <AdminTableSkeleton showHeader={false} />
        ) : isError ? (
          <div className="p-4">
            <AdminErrorState
              message={error instanceof Error ? error.message : 'Không tải được danh sách Gift Code'}
              onRetry={() => void refetch()}
            />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 border-t border-border text-center">
            <p className="text-sm font-semibold text-muted-foreground">Không tìm thấy mã Gift Code nào</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Vui lòng kiểm tra lại từ khóa tìm kiếm hoặc bộ lọc.</p>
          </div>
        ) : (
          <>
            <div className={isFetching ? 'opacity-60 transition-opacity duration-200' : 'transition-opacity duration-200'}>
              {/* Desktop view */}
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent h-[calc(50vh/10)]">
                      <TableHead className="text-muted-foreground py-0 h-full w-[160px]">Mã Gift Code</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full">Phần thưởng kèm theo</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full w-[180px]">Lượt sử dụng</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full w-[180px]">Hạn sử dụng</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full w-[130px] text-center">Hoạt động</TableHead>
                      <TableHead className="w-12 py-0 h-full">
                        <span className="sr-only">Hành động</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <MotionTableBody motionKey={`${page}-${debouncedFilter}-${statusFilter}-${filteredItems.length}`}>
                    {filteredItems.map((row) => {
                      const expired = isExpired(row.expiryDate);
                      return (
                        <MotionTableRow
                          key={row.id}
                          {...motionTableRowProps}
                          className="h-[calc(70vh/11)] hover:bg-transparent"
                        >
                          {/* Mã Code */}
                          <TableCell className="py-2">
                            <span className="font-mono font-bold text-bloom-green-dark dark:text-bloom-green-mid border bg-muted/60 px-2.5 py-1 rounded text-sm tracking-wider uppercase">
                              {row.code}
                            </span>
                          </TableCell>

                          {/* Phần thưởng */}
                          <TableCell className="py-2">
                            <div className="flex flex-wrap gap-1.5 max-w-[400px]">
                              {row.rewards?.map((reward, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className={`shadow-none font-medium px-2 py-0.5 rounded ${getRewardBadgeColor(reward.rewardType)}`}
                                >
                                  {reward.quantity} {getRewardName(reward.rewardType, reward.refId)}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>

                          {/* Lượt dùng */}
                          <TableCell className="font-medium py-2">
                            {row.timesUsed} / {row.usageLimit ?? 'Không giới hạn'}
                          </TableCell>

                          {/* Hạn sử dụng */}
                          <TableCell className="py-2">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-semibold">{formatDate(row.expiryDate)}</span>
                              {expired ? (
                                <span className="text-[10px] text-red-500 font-semibold">Đã hết hạn</span>
                              ) : (
                                <span className="text-[10px] text-emerald-500 font-semibold">Còn hạn dùng</span>
                              )}
                            </div>
                          </TableCell>

                          {/* Hoạt động switch */}
                          <TableCell className="py-2 text-center">
                            <div className="flex items-center justify-center">
                              <Switch
                                checked={row.isActive}
                                onCheckedChange={() => handleToggleActive(row.id, row.isActive)}
                                disabled={updateStatusMutation.isPending}
                                aria-label="Toggle active status"
                              />
                            </div>
                          </TableCell>

                          {/* Hành động */}
                          <TableCell className="py-2">
                            <GiftCodeRowActions
                              onEdit={() => openEdit(row)}
                              onDelete={() => setDeleteTarget(row)}
                            />
                          </TableCell>
                        </MotionTableRow>
                      );
                    })}
                  </MotionTableBody>
                </Table>
              </div>

              {/* Mobile / Tablet view */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 lg:hidden">
                {filteredItems.map((row) => {
                  const expired = isExpired(row.expiryDate);
                  return (
                    <div
                      key={row.id}
                      className="relative flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between border-b border-border/60 pb-2">
                        <div className="flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-bloom-green-mid shrink-0" />
                          <span className="font-mono font-bold text-sm tracking-wider uppercase text-foreground">
                            {row.code}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={row.isActive}
                            onCheckedChange={() => handleToggleActive(row.id, row.isActive)}
                            disabled={updateStatusMutation.isPending}
                          />
                          <GiftCodeRowActions
                            onEdit={() => openEdit(row)}
                            onDelete={() => setDeleteTarget(row)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-xs">
                        <div className="space-y-0.5">
                          <span className="text-muted-foreground block text-[10px]">Đã dùng / Giới hạn</span>
                          <span className="font-semibold text-foreground">
                            {row.timesUsed} / {row.usageLimit ?? 'Vô hạn'}
                          </span>
                        </div>

                        <div className="space-y-0.5">
                          <span className="text-muted-foreground block text-[10px]">Hạn sử dụng</span>
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground">{formatDate(row.expiryDate)}</span>
                            {expired ? (
                              <span className="text-[10px] text-red-500 font-semibold">Đã hết hạn</span>
                            ) : (
                              <span className="text-[10px] text-emerald-500 font-semibold">Còn hoạt động</span>
                            )}
                          </div>
                        </div>

                        <div className="col-span-2 space-y-1">
                          <span className="text-muted-foreground block text-[10px]">Phần quà</span>
                          <div className="flex flex-wrap gap-1">
                            {row.rewards?.map((reward, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className={`shadow-none font-medium px-2 py-0.2 rounded text-[10px] ${getRewardBadgeColor(reward.rewardType)}`}
                              >
                                {reward.quantity} {getRewardName(reward.rewardType, reward.refId)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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

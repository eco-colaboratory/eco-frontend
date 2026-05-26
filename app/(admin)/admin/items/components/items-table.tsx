'use client';

import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Leaf, PlusCircle, Search } from 'lucide-react';

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
import { useItemsList } from '@/hooks/useItems';
import { AdminPagination } from '@/components/admin/shared/admin-pagination';
import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { AdminErrorState } from '@/components/admin/shared/admin-error-state';
import { useDebounce } from '@/hooks/useDebounce';
import { ItemRowActions } from './item-row-actions';
import { useItemsPage } from './items-provider';
import { ItemsPrimaryButtons } from './items-primary-buttons';
import { ITEM_TYPE_LABELS, ITEM_TYPE_REVERSE_MAPPING, type ItemTypeString } from './item-schema';
import type { Item } from '@/lib/types/catalog/item';
import { SafeImage } from '@/components/ui/safeImage copy';


const PAGE_SIZE = 8;

function ItemStatusBadge({ isDeleted }: { isDeleted?: boolean }) {
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

function ItemTypeBadge({ type }: { type?: Item['type'] }) {
  const typeStr = type !== undefined
    ? (typeof type === 'number'
        ? ITEM_TYPE_REVERSE_MAPPING[type as number] || 'WATER'
        : type as ItemTypeString)
    : 'WATER';

  const label = ITEM_TYPE_LABELS[typeStr] || typeStr;

  const colorMap: Record<string, string> = {
    WATER: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
    FERTILIZER: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
    PESTICIDE: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20',
  };

  const colors = colorMap[typeStr] || 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20';

  return (
    <Badge className={`border font-medium px-2 py-0.5 rounded shadow-none ${colors}`}>
      {label}
    </Badge>
  );
}

export function ItemsTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const { openEdit, setDeleteTarget } = useItemsPage();

  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'deleted'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'WATER' | 'FERTILIZER' | 'PESTICIDE'>('all');

  const debouncedFilter = useDebounce(filter, 300);

  const handleStatusChange = useCallback((val: string) => {
    setStatusFilter(val as 'all' | 'active' | 'deleted');
  }, []);

  const handleTypeChange = useCallback((val: string) => {
    setTypeFilter(val as 'all' | 'WATER' | 'FERTILIZER' | 'PESTICIDE');
  }, []);

  const isDeletedParam = statusFilter === 'all' ? undefined : statusFilter === 'deleted';
  const typeParam = typeFilter === 'all' ? undefined : typeFilter;

  const { data, isLoading, isFetching, isError, error, refetch } = useItemsList({
    page,
    pageSize: PAGE_SIZE,
    search: debouncedFilter,
    isDeleted: isDeletedParam,
    type: typeParam,
  });

  const setPage = useCallback(
    (next: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(next));
      router.push(`/admin/items?${params.toString()}`);
    },
    [router, searchParams]
  );

  const filteredItems = data?.items ?? [];
  const totalPages = data?.totalPages ?? Math.max(1, Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE));

  return (
    <div className="flex flex-1 flex-col gap-6">
      <AdminFadeIn>
        <PageHeader
          title="Danh sách vật phẩm"
          description="Quản lý các vật phẩm trò chơi, công cụ hỗ trợ và phân bón tại đây."
        >
          <ItemsPrimaryButtons />
        </PageHeader>
      </AdminFadeIn>

      <DataTableShell>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
            <Input
              placeholder="Tìm kiếm vật phẩm…"
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

            <Select value={typeFilter} onValueChange={handleTypeChange}>
              <SelectTrigger className="h-9 w-[170px] border-dashed shadow-none">
                <Leaf className="mr-2 h-4 w-4 opacity-50" />
                <SelectValue placeholder="Loại vật phẩm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="WATER">Bình tưới / Nước</SelectItem>
                <SelectItem value="FERTILIZER">Phân bón</SelectItem>
                <SelectItem value="PESTICIDE">Thuốc trừ sâu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <AdminTableSkeleton showHeader={false} />
        ) : isError ? (
          <div className="p-4">
            <AdminErrorState
              message={error instanceof Error ? error.message : 'Không tải được danh sách vật phẩm'}
              onRetry={() => void refetch()}
            />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 border-t border-border text-center">
            <p className="text-sm font-semibold text-muted-foreground">Không tìm thấy vật phẩm phù hợp</p>
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
                      <TableHead className="text-muted-foreground py-0 h-full w-[88px]">Ảnh</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full">Tên vật phẩm</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full">Mô tả</TableHead>
                      <TableHead className="text-muted-foreground text-right py-0 h-full">Giá mua</TableHead>
                      <TableHead className="text-muted-foreground text-center py-0 h-full">Hồi chiêu</TableHead>
                      <TableHead className="text-muted-foreground text-center py-0 h-full">Kinh nghiệm</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full">Loại</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full">Trạng thái</TableHead>
                      <TableHead className="w-12 py-0 h-full">
                        <span className="sr-only">Hành động</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <MotionTableBody motionKey={`${page}-${debouncedFilter}-${statusFilter}-${typeFilter}-${filteredItems.length}`}>
                    {filteredItems.map((row: Item) => (
                      <MotionTableRow
                        key={row.id}
                        {...motionTableRowProps}
                        className="h-[calc(70vh/11)] hover:bg-transparent"
                      >
                        <TableCell className="py-2">
                          <SafeImage
                            src={row.imageUrl}
                            alt={row.name}
                            className="h-14 w-14 rounded-md border border-border bg-muted object-cover shadow-sm transition-all duration-200 hover:scale-105"
                          />
                        </TableCell>
                        <TableCell className="font-semibold py-0">{row.name}</TableCell>
                        <TableCell className="text-muted-foreground py-0 truncate max-w-[200px]">{row.description || '—'}</TableCell>
                        <TableCell className="text-right font-medium text-amber-600 dark:text-amber-500 py-0">
                          {(row.price ?? 0).toLocaleString('vi-VN')} xu
                        </TableCell>
                        <TableCell className="text-center py-0 font-medium">{row.cooldownTime ?? 0}s</TableCell>
                        <TableCell className="text-center py-0 font-semibold text-emerald-600 dark:text-emerald-500">
                          +{row.receivedExp ?? 0} EXP
                        </TableCell>
                        <TableCell className="py-0">
                          <ItemTypeBadge type={row.type} />
                        </TableCell>
                        <TableCell className="py-0">
                          <ItemStatusBadge isDeleted={row.isDeleted} />
                        </TableCell>
                        <TableCell className="py-0">
                          <ItemRowActions
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

              {/* Mobile View */}
              <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                {filteredItems.map((row: Item) => (
                  <div
                    key={row.id}
                    className="relative flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    <SafeImage
                      src={row.imageUrl}
                      alt={row.name}
                      className="h-16 w-16 shrink-0 rounded-lg border border-border bg-muted object-cover shadow-sm"
                    />
                    <div className="flex-1 space-y-1.5 min-w-0 pr-6">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm text-foreground truncate">{row.name}</h4>
                        <ItemTypeBadge type={row.type} />
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{row.description || '—'}</p>
                      <div className="flex items-center gap-2 text-xs font-semibold flex-wrap">
                        <span className="text-amber-600 dark:text-amber-500">{(row.price ?? 0).toLocaleString('vi-VN')} xu</span>
                        <span className="text-muted-foreground/60">•</span>
                        <span className="text-foreground/80">{row.cooldownTime ?? 0}s hồi</span>
                        <span className="text-muted-foreground/60">•</span>
                        <span className="text-emerald-600">+{row.receivedExp ?? 0} EXP</span>
                      </div>
                      <div className="pt-0.5">
                        <ItemStatusBadge isDeleted={row.isDeleted} />
                      </div>
                    </div>
                    <div className="absolute right-2 top-2">
                      <ItemRowActions
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

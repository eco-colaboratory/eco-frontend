'use client';

import { useState } from 'react';
import { PlusCircle, Search, Coins } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { MotionTableBody } from '@/components/admin/motion-table-body';
import { MotionTableRow, motionTableRowProps } from '@/components/admin/motion-table-row';
import { AdminFadeIn } from '@/components/admin/admin-fade-in';
import { DataTableShell } from '@/components/data-table/data-table-shell';
import { PageHeader } from '@/components/layout/page-header';
import { useCoinPackagesList, useUpdateCoinPackageStatus } from '@/hooks/useCoinPackages';
import { AdminPagination } from '@/components/admin/shared/admin-pagination';
import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { AdminErrorState } from '@/components/admin/shared/admin-error-state';
import { useCoinPackagesPage } from './coin-packages-provider';
import { CoinPackageRowActions } from './coin-package-row-actions';
import type { AdminCoinPackageDto } from '@/lib/types/catalog/coin-package';

const PAGE_SIZE = 8;

export function CoinPackagesTable() {
  const { openCreate } = useCoinPackagesPage();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: coinPackages = [], isLoading, isError, error, refetch } = useCoinPackagesList();
  const updateStatusMutation = useUpdateCoinPackageStatus();

  const handleStatusChange = async (id: string, currentStatus: boolean) => {
    try {
      await updateStatusMutation.mutateAsync({ id, isActive: !currentStatus });
      toast.success('Cập nhật trạng thái gói nạp thành công');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi cập nhật trạng thái');
    }
  };

  // Lọc dữ liệu client-side
  const filteredPackages = coinPackages.filter((pkg) => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return true;
    return (
      pkg.coinAmount.toString().includes(term) ||
      pkg.priceVnd.toString().includes(term)
    );
  });

  const totalCount = filteredPackages.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  
  // Reset page khi tìm kiếm làm thay đổi số trang
  const currentPage = Math.min(page, totalPages);
  
  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="flex flex-1 flex-col gap-6">
      <AdminFadeIn>
        <PageHeader
          title="Danh sách gói nạp coin"
          description="Quản lý các gói coin có thể mua bằng tiền mặt (VND) để nạp vào tài khoản player."
        >
          <Button onClick={openCreate} className="h-9 gap-1.5 shadow-none">
            <PlusCircle className="h-4 w-4" />
            <span>Thêm gói nạp</span>
          </Button>
        </PageHeader>
      </AdminFadeIn>

      <DataTableShell>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
            <Input
              placeholder="Tìm theo số coin hoặc giá VND…"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="h-9 pl-9 border-border bg-background shadow-none"
            />
          </div>
        </div>

        {isLoading ? (
          <AdminTableSkeleton showHeader={false} />
        ) : isError ? (
          <div className="p-4">
            <AdminErrorState
              message={error instanceof Error ? error.message : 'Không tải được danh sách gói nạp'}
              onRetry={() => void refetch()}
            />
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 border-t border-border text-center">
            <p className="text-sm font-semibold text-muted-foreground">Không tìm thấy gói nạp phù hợp</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Vui lòng kiểm tra lại từ khóa tìm kiếm.</p>
          </div>
        ) : (
          <>
            <div className="transition-opacity duration-200">
              {/* Desktop view */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent h-[calc(50vh/10)]">
                      <TableHead className="text-muted-foreground py-0 h-full w-[88px] text-center">Icon</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full">Số coin nạp</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full">Giá tiền thanh toán</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full w-[150px] text-center">Bật/Tắt hiển thị</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full w-[120px] text-center">Trạng thái</TableHead>
                      <TableHead className="w-12 py-0 h-full">
                        <span className="sr-only">Hành động</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <MotionTableBody motionKey={`${currentPage}-${searchQuery}-${filteredPackages.length}`}>
                    {paginatedPackages.map((row: AdminCoinPackageDto) => (
                      <MotionTableRow
                        key={row.id}
                        {...motionTableRowProps}
                        className="h-[calc(70vh/11)] hover:bg-transparent"
                      >
                        <TableCell className="py-2 text-center">
                          <div className="flex justify-center items-center h-full">
                            <div className="h-10 w-10 flex items-center justify-center rounded-lg border border-border bg-amber-50 dark:bg-amber-500/10 text-amber-500">
                              <Coins className="h-5 w-5" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-foreground py-0">
                          {row.coinAmount.toLocaleString('vi-VN')} Coins
                        </TableCell>
                        <TableCell className="text-emerald-600 dark:text-emerald-500 font-semibold py-0">
                          {row.priceVnd.toLocaleString('vi-VN')} VND
                        </TableCell>
                        <TableCell className="py-0 text-center">
                          <div className="flex items-center justify-center">
                            <Switch
                              checked={row.isActive}
                              disabled={updateStatusMutation.isPending}
                              onCheckedChange={() => void handleStatusChange(row.id, row.isActive)}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="py-0 text-center">
                          {row.isActive ? (
                            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 font-medium px-2.5 py-0.5 rounded-full dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 shadow-none">
                              Hoạt động
                            </Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-100 font-medium px-2.5 py-0.5 rounded-full dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 shadow-none">
                              Đang ẩn
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="py-0">
                          <CoinPackageRowActions coinPackage={row} />
                        </TableCell>
                      </MotionTableRow>
                    ))}
                  </MotionTableBody>
                </Table>
              </div>

              {/* Mobile View */}
              <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                {paginatedPackages.map((row: AdminCoinPackageDto) => (
                  <div
                    key={row.id}
                    className="relative flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-lg border border-border bg-amber-50 dark:bg-amber-500/10 text-amber-500">
                      <Coins className="h-6 w-6" />
                    </div>
                    <div className="flex-1 space-y-1.5 min-w-0 pr-6">
                      <h4 className="font-bold text-sm text-foreground">
                        {row.coinAmount.toLocaleString('vi-VN')} Coins
                      </h4>
                      <p className="text-xs font-semibold text-emerald-600">
                        {row.priceVnd.toLocaleString('vi-VN')} VND
                      </p>
                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-muted-foreground">Hiển thị:</span>
                          <Switch
                            checked={row.isActive}
                            disabled={updateStatusMutation.isPending}
                            onCheckedChange={() => void handleStatusChange(row.id, row.isActive)}
                            className="scale-90"
                          />
                        </div>
                        <span className="text-muted-foreground/60">|</span>
                        <div>
                          {row.isActive ? (
                            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 text-[10px] font-medium px-2 py-0.2 rounded-full dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 shadow-none">
                              Hoạt động
                            </Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-100 text-[10px] font-medium px-2 py-0.2 rounded-full dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 shadow-none">
                              Đang ẩn
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="absolute right-2 top-2">
                      <CoinPackageRowActions coinPackage={row} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-border px-4 py-3">
              <AdminPagination
                page={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
                disabled={isLoading}
              />
            </div>
          </>
        )}
      </DataTableShell>
    </div>
  );
}

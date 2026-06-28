'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Store, Coins, User, Pencil, ArrowRight } from 'lucide-react';

import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import { useShopCatalog } from '@/hooks/useShopCatalog';
import { AdminPagination } from '@/components/admin/shared/admin-pagination';
import { AdminTableSkeleton } from '@/components/admin/shared/admin-table-skeleton';
import { AdminErrorState } from '@/components/admin/shared/admin-error-state';
import { SafeImage } from '@/components/ui/safeImage copy';
import { useShopPricesPage } from './shop-prices-provider';
import type { ShopCatalogItem } from '@/lib/types/catalog/shop-catalog';

const PAGE_SIZE = 8;

const CATEGORY_LABELS: Record<string, string> = {
  Consumable: 'Vật phẩm',
  Seed: 'Hạt giống',
  Decoration: 'Trang trí',
  Character: 'Nhân vật',
  CoinPackage: 'Gói nạp coin',
};

function CategoryBadge({ category }: { category: ShopCatalogItem['category'] }) {
  const colorMap: Record<string, string> = {
    Consumable: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
    Seed: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
    Decoration: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20',
    Character: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
    CoinPackage: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
  };

  const colors = colorMap[category] || 'bg-slate-50 text-slate-700 border-slate-200';
  const label = CATEGORY_LABELS[category] || category;

  return (
    <Badge className={`border font-medium px-2.5 py-0.5 rounded shadow-none ${colors}`}>
      {label}
    </Badge>
  );
}

export function ShopPricesTable() {
  const { openEdit } = useShopPricesPage();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const { data: catalog = [], isLoading, isError, error, refetch } = useShopCatalog();

  const handleCategoryChange = (val: string) => {
    setCategoryFilter(val);
    setPage(1);
  };

  // Lọc dữ liệu client-side
  const filteredCatalog = catalog.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalCount = filteredCatalog.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedCatalog = filteredCatalog.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Render Image hoặc Icon
  const renderItemImage = (item: ShopCatalogItem) => {
    if (item.category === 'CoinPackage') {
      return (
        <div className="h-12 w-12 flex items-center justify-center rounded-lg border border-border bg-amber-50 dark:bg-amber-500/10 text-amber-500">
          <Coins className="h-6 w-6" />
        </div>
      );
    }
    if (item.category === 'Character') {
      return (
        <div className="h-12 w-12 flex items-center justify-center rounded-lg border border-border bg-rose-50 dark:bg-rose-500/10 text-rose-500">
          <User className="h-6 w-6" />
        </div>
      );
    }
    return (
      <SafeImage
        src={item.imageUrl}
        alt={item.name}
        className="h-12 w-12 rounded-lg border border-border bg-muted object-cover shadow-sm transition-all duration-200 hover:scale-105"
      />
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <AdminFadeIn>
        <PageHeader
          title="Danh sách giá Cửa hàng"
          description="Quản lý giá bán của tất cả sản phẩm trong game (Vật phẩm, Hạt giống, Đồ trang trí, Nhân vật, Gói nạp) hiển thị ở Shop."
        />
      </AdminFadeIn>

      <DataTableShell>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
            <Input
              placeholder="Tìm kiếm sản phẩm theo tên…"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="h-9 pl-9 border-border bg-background shadow-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select value={categoryFilter} onValueChange={handleCategoryChange}>
              <SelectTrigger className="h-9 w-[170px] border-dashed shadow-none">
                <Store className="mr-2 h-4 w-4 opacity-50" />
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                <SelectItem value="Consumable">Vật phẩm</SelectItem>
                <SelectItem value="Seed">Hạt giống</SelectItem>
                <SelectItem value="Decoration">Trang trí</SelectItem>
                <SelectItem value="Character">Nhân vật</SelectItem>
                <SelectItem value="CoinPackage">Gói nạp coin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <AdminTableSkeleton showHeader={false} />
        ) : isError ? (
          <div className="p-4">
            <AdminErrorState
              message={error instanceof Error ? error.message : 'Không tải được danh sách cửa hàng'}
              onRetry={() => void refetch()}
            />
          </div>
        ) : filteredCatalog.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 border-t border-border text-center">
            <p className="text-sm font-semibold text-muted-foreground">Không tìm thấy sản phẩm phù hợp</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Vui lòng kiểm tra lại từ khóa tìm kiếm hoặc bộ lọc.</p>
          </div>
        ) : (
          <>
            <div className="transition-opacity duration-200">
              {/* Desktop view */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent h-[calc(50vh/10)]">
                      <TableHead className="text-muted-foreground py-0 h-full w-[88px] text-center">Ảnh</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full">Tên sản phẩm</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full">Danh mục</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full">Giá hiện tại</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full w-[120px] text-center">Trạng thái</TableHead>
                      <TableHead className="text-muted-foreground py-0 h-full w-[150px] text-center">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <MotionTableBody motionKey={`${currentPage}-${searchQuery}-${categoryFilter}-${filteredCatalog.length}`}>
                    {paginatedCatalog.map((row: ShopCatalogItem) => (
                      <MotionTableRow
                        key={row.id}
                        {...motionTableRowProps}
                        className="h-[calc(70vh/11)] hover:bg-transparent"
                      >
                        <TableCell className="py-2 text-center">
                          <div className="flex justify-center items-center h-full">
                            {renderItemImage(row)}
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-foreground py-0">
                          {row.name}
                        </TableCell>
                        <TableCell className="py-0">
                          <CategoryBadge category={row.category} />
                        </TableCell>
                        <TableCell className="font-semibold py-0">
                          {row.category === 'CoinPackage' ? (
                            <span className="text-emerald-600 dark:text-emerald-500">
                              {row.price.toLocaleString('vi-VN')} VND
                            </span>
                          ) : (
                            <span className="text-amber-600 dark:text-amber-500">
                              {row.price.toLocaleString('vi-VN')} xu
                            </span>
                          )}
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
                        <TableCell className="py-0 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEdit(row)}
                              className="h-8 gap-1 shadow-none"
                            >
                              <Pencil className="h-3 w-3" />
                              <span>Sửa giá</span>
                            </Button>
                            {row.category === 'CoinPackage' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="h-8 gap-1 p-2 text-muted-foreground hover:text-primary"
                              >
                                <Link href="/admin/coin-packages">
                                  <span>Quản lý gói</span>
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </MotionTableRow>
                    ))}
                  </MotionTableBody>
                </Table>
              </div>

              {/* Mobile View */}
              <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                {paginatedCatalog.map((row: ShopCatalogItem) => (
                  <div
                    key={row.id}
                    className="relative flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    <div className="shrink-0">{renderItemImage(row)}</div>
                    <div className="flex-1 space-y-1.5 min-w-0 pr-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm text-foreground truncate">{row.name}</h4>
                        <CategoryBadge category={row.category} />
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        {row.category === 'CoinPackage' ? (
                          <span className="text-emerald-600 font-semibold">
                            {row.price.toLocaleString('vi-VN')} VND
                          </span>
                        ) : (
                          <span className="text-amber-600 font-semibold">
                            {row.price.toLocaleString('vi-VN')} xu
                          </span>
                        )}
                        <span className="text-muted-foreground/60">•</span>
                        {row.isActive ? (
                          <span className="text-emerald-600 font-semibold">Hoạt động</span>
                        ) : (
                          <span className="text-muted-foreground">Đang ẩn</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 pt-1 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEdit(row)}
                          className="h-7 text-xs gap-1 shadow-none"
                        >
                          <Pencil className="h-3 w-3" />
                          <span>Sửa giá</span>
                        </Button>
                        {row.category === 'CoinPackage' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="h-7 text-xs gap-1 p-1 text-muted-foreground hover:text-primary"
                          >
                            <Link href="/admin/coin-packages">
                              <span>Quản lý gói</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        )}
                      </div>
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

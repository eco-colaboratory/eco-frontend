'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

function pageRange(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, 4, 'ellipsis', total];
  }
  if (current >= total - 2) {
    return [1, 'ellipsis', total - 3, total - 2, total - 1, total];
  }
  return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total];
}

export function AdminPagination({
  page,
  totalPages,
  totalCount,
  pageSize = 10,
  onPageChange,
  disabled,
}: {
  page: number;
  totalPages: number;
  totalCount?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}) {
  const safeTotal = Math.max(1, totalPages);
  const canPrev = page > 1;
  const canNext = page < safeTotal;
  const pages = pageRange(page, safeTotal);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-5 justify-end">
        <p className="text-center text-sm font-medium text-foreground tabular-nums sm:text-right">
          Trang {page} trên {safeTotal}
        </p>
        <Pagination className="mx-0 w-auto">
          <PaginationContent className="justify-center sm:justify-end">
            <PaginationItem>
              <PaginationFirst
                disabled={disabled || !canPrev}
                onClick={() => canPrev && onPageChange(1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                disabled={disabled || !canPrev}
                onClick={() => canPrev && onPageChange(page - 1)}
              />
            </PaginationItem>
            {pages.map((p, i) =>
              p === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={p === page}
                    disabled={disabled}
                    onClick={() => onPageChange(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                disabled={disabled || !canNext}
                onClick={() => canNext && onPageChange(page + 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                disabled={disabled || !canNext}
                onClick={() => canNext && onPageChange(safeTotal)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

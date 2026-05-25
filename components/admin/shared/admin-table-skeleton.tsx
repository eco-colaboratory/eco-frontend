import { Skeleton } from '@/components/ui/skeleton';

export function AdminTableSkeleton({
  rows = 5,
  showHeader = true,
}: {
  rows?: number;
  showHeader?: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col gap-6 w-full">
      {showHeader && (
        <div className="flex flex-col gap-2">
          {/* Skeleton cho tiêu đề (Title) */}
          <Skeleton className="h-8 w-48 rounded-lg bg-muted-foreground/10" />
          {/* Skeleton cho mô tả (Description) */}
          <Skeleton className="h-4 w-80 rounded-lg bg-muted-foreground/10" />
        </div>
      )}
      <div className="space-y-2 rounded-xl border border-border bg-card p-4">
        <Skeleton className="h-8 w-full" />
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}

'use client';

import { SearchIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useSearch } from '@/context/search-provider';
import { cn } from '@/lib/utils';

export function Search({ className }: { className?: string }) {
  const { setOpen } = useSearch();

  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        'relative h-9 w-full justify-start gap-2 border-border bg-background text-sm font-normal text-muted-foreground shadow-none md:max-w-sm lg:max-w-md',
        className
      )}
      onClick={() => setOpen(true)}
    >
      <SearchIcon className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
      <span className="hidden sm:inline-flex">Search</span>
      <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}

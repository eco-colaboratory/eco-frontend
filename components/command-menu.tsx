'use client';

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useSearch } from '@/context/search-provider';
import { ADMIN_NAV_ITEMS } from '@/components/admin/admin-nav-config';
import { useRouter } from 'next/navigation';

/** v1 stub — full cmdk actions in v2 */
export function CommandMenu() {
  const { open, setOpen } = useSearch();
  const router = useRouter();

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Tìm trang admin…" />
      <CommandList>
        <CommandEmpty>Không tìm thấy.</CommandEmpty>
        <CommandGroup heading="Điều hướng">
          {ADMIN_NAV_ITEMS.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => {
                setOpen(false);
                router.push(item.href);
              }}
            >
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

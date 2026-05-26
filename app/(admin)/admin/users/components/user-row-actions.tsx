'use client';

import { MoreHorizontal, Pencil, ShieldBan, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserRowActions({
  isBanned,
  disableBan,
  onEdit,
  onBanToggle,
}: {
  isBanned: boolean;
  disableBan?: boolean;
  onEdit: () => void;
  onBanToggle: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Hành động">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          Sửa
        </DropdownMenuItem>
        <DropdownMenuItem disabled={disableBan} onClick={onBanToggle}>
          {isBanned ? (
            <>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Mở khóa
            </>
          ) : (
            <>
              <ShieldBan className="mr-2 h-4 w-4" />
              Khóa
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

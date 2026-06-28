'use client';

import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCoinPackagesPage } from './coin-packages-provider';
import type { AdminCoinPackageDto } from '@/lib/types/catalog/coin-package';

type CoinPackageRowActionsProps = {
  coinPackage: AdminCoinPackageDto;
};

export function CoinPackageRowActions({ coinPackage }: CoinPackageRowActionsProps) {
  const { openEdit, setDeleteTarget } = useCoinPackagesPage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Mở menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="admin-theme">
        <DropdownMenuItem onClick={() => openEdit(coinPackage)} className="cursor-pointer">
          <Edit className="mr-2 h-4 w-4" />
          Sửa thông tin
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setDeleteTarget(coinPackage)}
          className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Xóa gói nạp
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

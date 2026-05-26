'use client';

import { PackagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useItemsPage } from './items-provider';

export function ItemsPrimaryButtons() {
  const { openCreate } = useItemsPage();

  return (
    <>
      <Button type="button" className="h-9 shadow-none" onClick={openCreate}>
        <PackagePlus className="mr-2 h-4 w-4" />
        Thêm vật phẩm
      </Button>
    </>
  );
}

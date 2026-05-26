'use client';

import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDecorsPage } from './decors-provider';

export function DecorsPrimaryButtons() {
  const { openCreate } = useDecorsPage();

  return (
    <>
      <Button type="button" className="h-9 shadow-none" onClick={openCreate}>
        <Palette className="mr-2 h-4 w-4" />
        Thêm đồ trang trí
      </Button>
    </>
  );
}

'use client';

import { Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGiftCodesPage } from './gift-codes-provider';

export function GiftCodesPrimaryButtons() {
  const { openCreate } = useGiftCodesPage();

  return (
    <Button type="button" className="h-9 shadow-none" onClick={openCreate}>
      <Ticket className="mr-2 h-4 w-4" />
      Thêm Gift Code
    </Button>
  );
}

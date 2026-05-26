'use client';

import { Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSynergiesPage } from './synergies-provider';

export function SynergiesPrimaryButtons() {
  const { openCreate } = useSynergiesPage();

  return (
    <>
      <Button type="button" className="h-9 shadow-none" onClick={openCreate}>
        <Layers className="mr-2 h-4 w-4" />
        Thêm hệ sinh thái
      </Button>
    </>
  );
}

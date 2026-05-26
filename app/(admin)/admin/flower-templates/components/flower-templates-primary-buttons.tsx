'use client';

import { Flower } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFlowerTemplatesPage } from './flower-templates-provider';

export function FlowerTemplatesPrimaryButtons() {
  const { openCreate } = useFlowerTemplatesPage();

  return (
    <>
      <Button type="button" className="h-9 shadow-none" onClick={openCreate}>
        <Flower className="mr-2 h-4 w-4" />
        Thêm mẫu hoa
      </Button>
    </>
  );
}

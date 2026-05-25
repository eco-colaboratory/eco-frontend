'use client';

import { UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useUsersPage } from './users-provider';

export function UsersPrimaryButtons() {
  const { openCreate } = useUsersPage();

  return (
    <>
      <Button type="button" className="h-9 shadow-none" onClick={openCreate}>
        <UserPlus className="mr-2 h-4 w-4" />
        Thêm người dùng
      </Button>
    </>
  );
}

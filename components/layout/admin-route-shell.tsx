'use client';

import { AdminPageTransition } from '@/components/admin/admin-page-transition';
import { CommandMenu } from '@/components/command-menu';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';

export function AdminRouteShell({
  children,
  className,
  headerStart,
}: {
  children: React.ReactNode;
  className?: string;
  headerStart?: React.ReactNode;
}) {
  return (
    <>
      <Header fixed>
        {headerStart ?? <Search className="flex-1 md:max-w-md" />}
        <div className="ms-auto flex items-center gap-1">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main className={className}>
        <AdminPageTransition>{children}</AdminPageTransition>
      </Main>
      <CommandMenu />
    </>
  );
}

import type { Metadata } from 'next';

import { AdminGuard } from '@/components/admin';
import { AdminMotionProvider } from '@/components/admin/admin-motion-provider';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SkipToMain } from '@/components/skip-to-main';
import { LayoutProvider } from '@/context/layout-provider';
import { SearchProvider } from '@/context/search-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: {
    default: 'Admin',
    template: '%s | Eco Admin',
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <AdminMotionProvider>
        <SearchProvider>
          <LayoutProvider>
            <SidebarProvider defaultOpen className="admin-theme min-h-svh">
              <SkipToMain />
              <AppSidebar />
              <SidebarInset className="flex min-h-svh flex-col bg-background @container/content">
                {children}
              </SidebarInset>
            </SidebarProvider>
          </LayoutProvider>
        </SearchProvider>
      </AdminMotionProvider>
    </AdminGuard>
  );
}

'use client';

import { m } from 'framer-motion';

import { useLayout } from '@/context/layout-provider';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavGroup } from './nav-group';
import { NavUser } from './nav-user';
import { sidebarData } from './data/sidebar-data';

export function AppSidebar() {
  const { collapsible } = useLayout();

  return (
    <Sidebar collapsible={collapsible === 'none' ? 'offcanvas' : collapsible} variant="sidebar">
      <m.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="flex h-full w-full flex-col"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className="pointer-events-none">
                <div className="flex aspect-square size-10 group-data-[collapsible=icon]:size-8 items-center justify-center rounded-lg overflow-hidden transition-all duration-200">
                  <img src="/assets/logo/logo_xanh.png" alt="CHẠM Flora Logo" className="size-full object-contain" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">CHẠM Flora</span>
                  <span className="truncate text-xs text-muted-foreground">Trang quản trị</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {sidebarData.navGroups.map((group) => (
            <NavGroup key={group.title} title={group.title} items={group.items} />
          ))}
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </m.div>
      <SidebarRail />
    </Sidebar>
  );
}
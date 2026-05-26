import { ADMIN_NAV_ITEMS } from '@/components/admin/admin-nav-config';

export const sidebarData = {
  navGroups: [
    {
      title: 'Quản trị',
      items: ADMIN_NAV_ITEMS.map((item) => ({
        title: item.label,
        url: item.href,
        icon: item.icon,
      })),
    },
  ],
};

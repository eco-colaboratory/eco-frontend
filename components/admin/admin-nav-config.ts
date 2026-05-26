import {
  Flower2,
  LayoutDashboard,
  Package,
  Palette,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: 'Tổng quan', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Người dùng', href: '/admin/users', icon: Users },
  { label: 'Vật phẩm', href: '/admin/items', icon: Package },
  { label: 'Trang trí', href: '/admin/decors', icon: Palette },
  { label: 'Hệ sinh thái', href: '/admin/synergies', icon: Sparkles },
  { label: 'Mẫu hoa', href: '/admin/flower-templates', icon: Flower2 },
];

export const ADMIN_QUICK_LINKS = ADMIN_NAV_ITEMS.filter((item) => item.href !== '/admin/dashboard');

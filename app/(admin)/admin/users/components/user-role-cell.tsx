import { Calculator, Shield, User, UserCog } from 'lucide-react';

import { cn } from '@/lib/utils';

const ROLE_ICONS: Record<string, typeof User> = {
  Admin: Shield,
  SuperAdmin: Shield,
  Instructor: UserCog,
  Student: User,
  Player: User,
  Cashier: Calculator,
};

const ROLE_LABELS: Record<string, string> = {
  Admin: 'Quản trị viên',
  SuperAdmin: 'Quản trị tối cao',
  Instructor: 'Giảng viên',
  Student: 'Học sinh',
  Player: 'Người chơi',
  Cashier: 'Thu ngân',
};

export function UserRoleCell({ role }: { role?: string }) {
  if (!role) return <span className="text-muted-foreground">—</span>;

  const Icon = ROLE_ICONS[role] ?? User;

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-foreground">
      <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
      {ROLE_LABELS[role] ?? role}
    </span>
  );
}

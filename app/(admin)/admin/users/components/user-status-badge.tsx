import { Badge } from '@/components/ui/badge';

export function UserStatusBadge({ isBanned }: { isBanned?: boolean }) {
  if (isBanned) {
    return (
      <Badge
        className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-50 font-medium px-2.5 py-0.5 rounded-full dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
      >
        Đã khóa
      </Badge>
    );
  }

  return (
    <Badge
      className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 font-medium px-2.5 py-0.5 rounded-full dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
    >
      Hoạt động
    </Badge>
  );
}

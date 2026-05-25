'use client';

import { ListFilter, PlusCircle, SlidersHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type DataTableToolbarProps = {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  className?: string;
  showStatusFilter?: boolean;
  statusValue?: string;
  onStatusChange?: (value: string) => void;
  showRoleFilter?: boolean;
  roleValue?: string;
  onRoleChange?: (value: string) => void;
};

export function DataTableToolbar({
  searchPlaceholder = 'Tìm kiếm…',
  searchValue,
  onSearchChange,
  className,
  showStatusFilter,
  statusValue = 'all',
  onStatusChange,
  showRoleFilter,
  roleValue = 'all',
  onRoleChange,
}: DataTableToolbarProps) {
  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-center', className)}>
      <Input
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="h-9 max-w-sm border-border bg-background shadow-none"
      />
      <div className="flex flex-wrap items-center gap-2">
        {showStatusFilter ? (
          <Select value={statusValue} onValueChange={onStatusChange}>
            <SelectTrigger className="h-9 w-[170px] border-dashed shadow-none">
              <PlusCircle className="mr-2 h-4 w-4 opacity-50" />
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="banned">Bị cấm</SelectItem>
            </SelectContent>
          </Select>
        ) : null}
        {showRoleFilter ? (
          <Select value={roleValue} onValueChange={onRoleChange}>
            <SelectTrigger className="h-9 w-[170px] border-dashed shadow-none">
              <PlusCircle className="mr-2 h-4 w-4 opacity-50" />
              <SelectValue placeholder="Vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả vai trò</SelectItem>
              <SelectItem value="Player">Người chơi</SelectItem>
              <SelectItem value="Admin">Quản trị viên</SelectItem>
              <SelectItem value="SuperAdmin">Quản trị tối cao</SelectItem>
              <SelectItem value="Instructor">Giảng viên</SelectItem>
              <SelectItem value="Student">Học sinh</SelectItem>
            </SelectContent>
          </Select>
        ) : null}
        <Button variant="outline" size="sm" className="ml-auto h-9 shadow-none sm:ml-0">
          <ListFilter className="mr-2 h-4 w-4" />
          Hiển thị
          <SlidersHorizontal className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </div>
    </div>
  );
}

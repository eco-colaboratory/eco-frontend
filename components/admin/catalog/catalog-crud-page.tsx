'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { AdminFadeIn } from '@/components/admin/admin-fade-in';
import { MotionTableBody } from '@/components/admin/motion-table-body';
import { MotionTableRow, motionTableRowProps } from '@/components/admin/motion-table-row';
import { DataTableShell } from '@/components/data-table/data-table-shell';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { PageHeader } from '@/components/layout/page-header';
import { AdminPagination } from '../shared/admin-pagination';
import { AdminTableSkeleton } from '../shared/admin-table-skeleton';
import { AdminEmptyState } from '../shared/admin-empty-state';
import { AdminErrorState } from '../shared/admin-error-state';

const PAGE_SIZE = 10;

export type CatalogFieldConfig = {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'url';
  required?: boolean;
};

export type CatalogColumnConfig<T> = {
  id: string;
  header: string;
  cell: (row: T) => React.ReactNode;
};

type CatalogHooks<T extends { id: string }> = {
  useCatalogList: (params: { page: number; pageSize: number }) => {
    data?: { items: T[]; totalCount: number; totalPages?: number };
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    refetch: () => void;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useCatalogCreate: () => { mutateAsync: (p: any) => Promise<T>; isPending: boolean };
  useCatalogUpdate: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutateAsync: (p: { id: string; payload: any }) => Promise<T>;
    isPending: boolean;
  };
  useCatalogDelete: () => { mutateAsync: (id: string) => Promise<void>; isPending: boolean };
};

export function CatalogCrudPage<T extends { id: string }, TForm extends Record<string, unknown>>({
  title,
  description,
  basePath,
  fields,
  columns,
  schema,
  hooks,
  mapToCreate,
  mapToUpdate,
}: {
  title: string;
  description: string;
  basePath: string;
  fields: CatalogFieldConfig[];
  columns: CatalogColumnConfig<T>[];
  schema: z.ZodType<TForm>;
  hooks: CatalogHooks<T>;
  mapToCreate: (values: TForm) => unknown;
  mapToUpdate: (values: TForm) => unknown;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);

  const { data, isLoading, isError, error, refetch } = hooks.useCatalogList({
    page,
    pageSize: PAGE_SIZE,
  });
  const createMutation = hooks.useCatalogCreate();
  const updateMutation = hooks.useCatalogUpdate();
  const deleteMutation = hooks.useCatalogDelete();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const form = useForm({
    // Zod 4 + RHF resolver typing — schema validated at config sites
    resolver: zodResolver(schema as z.ZodObject<z.ZodRawShape>),
    defaultValues: fields.reduce(
      (acc, f) => ({ ...acc, [f.name]: f.type === 'number' ? undefined : '' }),
      {} as Record<string, unknown>
    ),
  });

  const setPage = useCallback(
    (next: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(next));
      router.push(`${basePath}?${params.toString()}`);
    },
    [router, searchParams, basePath]
  );

  const openCreate = () => {
    setEditing(null);
    form.reset(
      fields.reduce(
        (acc, f) => ({ ...acc, [f.name]: f.type === 'number' ? undefined : '' }),
        {} as TForm
      )
    );
    setDialogOpen(true);
  };

  const openEdit = (row: T) => {
    setEditing(row);
    const values = { ...row } as unknown as TForm;
    form.reset(values);
    setDialogOpen(true);
  };

  const onSubmit = form.handleSubmit(async (raw) => {
    const values = raw as TForm;
    try {
      if (editing) {
        await updateMutation.mutateAsync({
          id: editing.id,
          payload: mapToUpdate(values),
        });
        toast.success('Đã cập nhật');
      } else {
        await createMutation.mutateAsync(mapToCreate(values));
        toast.success('Đã tạo');
      }
      setDialogOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi lưu');
    }
  });

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success('Đã xóa');
      setDeleteId(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi xóa');
    }
  };

  const totalPages =
    data?.totalPages ?? Math.max(1, Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE));

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const filteredItems = useMemo(() => {
    if (!data?.items) return [];
    const q = filter.trim().toLowerCase();
    if (!q) return data.items;
    return data.items.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(q)
    );
  }, [data?.items, filter]);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <AdminFadeIn>
        <PageHeader title={title} description={description}>
          <Button type="button" className="h-9 shadow-none" onClick={openCreate}>
            Thêm mới
          </Button>
        </PageHeader>
      </AdminFadeIn>

      {isLoading ? <AdminTableSkeleton showHeader={false} /> : null}
      {isError ? (
        <AdminErrorState
          message={error instanceof Error ? error.message : 'Không tải được dữ liệu'}
          onRetry={() => void refetch()}
        />
      ) : null}

      {!isLoading && !isError && data?.items.length === 0 ? (
        <AdminEmptyState
          title="Chưa có bản ghi"
          actionLabel="Thêm mới"
          onAction={openCreate}
        />
      ) : null}

      {!isLoading && !isError && data && data.items.length > 0 ? (
        <DataTableShell>
          <div className="p-4">
            <DataTableToolbar
              searchPlaceholder={`Filter ${title.toLowerCase()}…`}
              searchValue={filter}
              onSearchChange={setFilter}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {columns.map((col) => (
                  <TableHead key={col.id} scope="col" className="text-muted-foreground">
                    {col.header}
                  </TableHead>
                ))}
                <TableHead scope="col" className="w-12">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <MotionTableBody motionKey={`${page}-${filter}-${filteredItems.length}`}>
              {filteredItems.map((row) => (
                <MotionTableRow key={row.id} {...motionTableRowProps}>
                  {columns.map((col) => (
                    <TableCell key={col.id}>{col.cell(row)}</TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Hành động">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(row)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteId(row.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </MotionTableRow>
              ))}
            </MotionTableBody>
          </Table>
          <div className="border-t border-border px-4 py-3">
            <AdminPagination
              page={page}
              totalPages={totalPages}
              totalCount={data.totalCount}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </div>
        </DataTableShell>
      ) : null}

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? 'Sửa' : 'Thêm mới'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === 'textarea' ? (
                    <Textarea id={field.name} {...form.register(field.name as keyof TForm & string)} />
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type === 'number' ? 'number' : field.type === 'url' ? 'url' : 'text'}
                      {...form.register(field.name as keyof TForm & string, {
                        valueAsNumber: field.type === 'number',
                      })}
                    />
                  )}
                </div>
              ))}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="shadow-none"
                >
                  Lưu
                </Button>
              </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa bản ghi?</AlertDialogTitle>
            <AlertDialogDescription>Hành động này không thể hoàn tác (soft delete).</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
              onClick={(e) => {
                e.preventDefault();
                void confirmDelete();
              }}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

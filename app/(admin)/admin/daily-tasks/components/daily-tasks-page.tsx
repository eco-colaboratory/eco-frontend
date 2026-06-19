'use client';

import { toast } from 'sonner';
import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { DailyTasksProvider, useDailyTasksPage } from './daily-tasks-provider';
import { DailyTasksTable } from './daily-tasks-table';
import { DailyTaskFormDialog } from './daily-task-form-dialog';
import { useUpdateDailyTaskConfig } from '@/hooks/useDailyTasks';
import type { DailyTaskFormValues } from './daily-task-schema';

function DailyTasksPageContent() {
  const { formOpen, setFormOpen, selectedDailyTask } = useDailyTasksPage();
  const updateMutation = useUpdateDailyTaskConfig();

  const handleUpdate = async (values: DailyTaskFormValues) => {
    if (!selectedDailyTask) return;
    
    await updateMutation.mutateAsync({
      id: selectedDailyTask.id,
      payload: {
        target: values.target,
        rewardCurrency: values.rewardCurrency,
        rewardXP: values.rewardXP,
        rewardItemId: values.rewardItemId,
        rewardItemQty: values.rewardItemQty,
      },
    });
    
    toast.success('Đã cập nhật cấu hình nhiệm vụ thành công');
  };

  return (
    <>
      <DailyTasksTable />
      <DailyTaskFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        dailyTask={selectedDailyTask}
        onSubmit={handleUpdate}
        isPending={updateMutation.isPending}
      />
    </>
  );
}

export function DailyTasksPage() {
  return (
    <AdminRouteShell>
      <DailyTasksProvider>
        <DailyTasksPageContent />
      </DailyTasksProvider>
    </AdminRouteShell>
  );
}

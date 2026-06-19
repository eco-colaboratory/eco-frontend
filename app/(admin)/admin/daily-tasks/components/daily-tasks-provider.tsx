'use client';

import * as React from 'react';
import type { DailyTask } from '@/lib/types/catalog/daily-task';

type DailyTasksContextValue = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
  selectedDailyTask: DailyTask | null;
  setSelectedDailyTask: (task: DailyTask | null) => void;
  openEdit: (task: DailyTask) => void;
};

const DailyTasksContext = React.createContext<DailyTasksContextValue | null>(null);

export function DailyTasksProvider({ children }: { children: React.ReactNode }) {
  const [formOpen, setFormOpen] = React.useState(false);
  const [selectedDailyTask, setSelectedDailyTask] = React.useState<DailyTask | null>(null);

  const openEdit = React.useCallback((task: DailyTask) => {
    setSelectedDailyTask(task);
    setFormOpen(true);
  }, []);

  const value = React.useMemo(
    () => ({
      formOpen,
      setFormOpen,
      selectedDailyTask,
      setSelectedDailyTask,
      openEdit,
    }),
    [formOpen, selectedDailyTask, openEdit]
  );

  return <DailyTasksContext.Provider value={value}>{children}</DailyTasksContext.Provider>;
}

export function useDailyTasksPage() {
  const ctx = React.useContext(DailyTasksContext);
  if (!ctx) {
    throw new Error('useDailyTasksPage must be used within DailyTasksProvider');
  }
  return ctx;
}

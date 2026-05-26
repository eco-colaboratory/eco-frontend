'use client';

import * as React from 'react';
import type { Decor } from '@/lib/types/catalog/decor';

type DecorsContextValue = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
  formMode: 'create' | 'edit';
  setFormMode: (mode: 'create' | 'edit') => void;
  selectedDecor: Decor | null;
  setSelectedDecor: (decor: Decor | null) => void;
  deleteTarget: Decor | null;
  setDeleteTarget: (decor: Decor | null) => void;
  openCreate: () => void;
  openEdit: (decor: Decor) => void;
};

const DecorsContext = React.createContext<DecorsContextValue | null>(null);

export function DecorsProvider({ children }: { children: React.ReactNode }) {
  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<'create' | 'edit'>('create');
  const [selectedDecor, setSelectedDecor] = React.useState<Decor | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Decor | null>(null);

  const openCreate = React.useCallback(() => {
    setFormMode('create');
    setSelectedDecor(null);
    setFormOpen(true);
  }, []);

  const openEdit = React.useCallback((decor: Decor) => {
    setFormMode('edit');
    setSelectedDecor(decor);
    setFormOpen(true);
  }, []);

  const value = React.useMemo(
    () => ({
      formOpen,
      setFormOpen,
      formMode,
      setFormMode,
      selectedDecor,
      setSelectedDecor,
      deleteTarget,
      setDeleteTarget,
      openCreate,
      openEdit,
    }),
    [formOpen, formMode, selectedDecor, deleteTarget, openCreate, openEdit]
  );

  return <DecorsContext.Provider value={value}>{children}</DecorsContext.Provider>;
}

export function useDecorsPage() {
  const ctx = React.useContext(DecorsContext);
  if (!ctx) {
    throw new Error('useDecorsPage must be used within DecorsProvider');
  }
  return ctx;
}

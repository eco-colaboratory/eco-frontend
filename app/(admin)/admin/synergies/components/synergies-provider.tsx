'use client';

import * as React from 'react';
import type { Synergy } from '@/lib/types/catalog/synergy';

type SynergiesContextValue = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
  formMode: 'create' | 'edit';
  setFormMode: (mode: 'create' | 'edit') => void;
  selectedSynergy: Synergy | null;
  setSelectedSynergy: (synergy: Synergy | null) => void;
  deleteTarget: Synergy | null;
  setDeleteTarget: (synergy: Synergy | null) => void;
  openCreate: () => void;
  openEdit: (synergy: Synergy) => void;
};

const SynergiesContext = React.createContext<SynergiesContextValue | null>(null);

export function SynergiesProvider({ children }: { children: React.ReactNode }) {
  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<'create' | 'edit'>('create');
  const [selectedSynergy, setSelectedSynergy] = React.useState<Synergy | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Synergy | null>(null);

  const openCreate = React.useCallback(() => {
    setFormMode('create');
    setSelectedSynergy(null);
    setFormOpen(true);
  }, []);

  const openEdit = React.useCallback((synergy: Synergy) => {
    setFormMode('edit');
    setSelectedSynergy(synergy);
    setFormOpen(true);
  }, []);

  const value = React.useMemo(
    () => ({
      formOpen,
      setFormOpen,
      formMode,
      setFormMode,
      selectedSynergy,
      setSelectedSynergy,
      deleteTarget,
      setDeleteTarget,
      openCreate,
      openEdit,
    }),
    [formOpen, formMode, selectedSynergy, deleteTarget, openCreate, openEdit]
  );

  return <SynergiesContext.Provider value={value}>{children}</SynergiesContext.Provider>;
}

export function useSynergiesPage() {
  const ctx = React.useContext(SynergiesContext);
  if (!ctx) {
    throw new Error('useSynergiesPage must be used within SynergiesProvider');
  }
  return ctx;
}

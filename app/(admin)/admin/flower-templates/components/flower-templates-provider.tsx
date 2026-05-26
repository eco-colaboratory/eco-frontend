'use client';

import * as React from 'react';
import type { FlowerTemplate } from '@/lib/types/catalog/flower-template';

type FlowerTemplatesContextValue = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
  formMode: 'create' | 'edit';
  setFormMode: (mode: 'create' | 'edit') => void;
  selectedTemplate: FlowerTemplate | null;
  setSelectedTemplate: (template: FlowerTemplate | null) => void;
  deleteTarget: FlowerTemplate | null;
  setDeleteTarget: (template: FlowerTemplate | null) => void;
  openCreate: () => void;
  openEdit: (template: FlowerTemplate) => void;
};

const FlowerTemplatesContext = React.createContext<FlowerTemplatesContextValue | null>(null);

export function FlowerTemplatesProvider({ children }: { children: React.ReactNode }) {
  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<'create' | 'edit'>('create');
  const [selectedTemplate, setSelectedTemplate] = React.useState<FlowerTemplate | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<FlowerTemplate | null>(null);

  const openCreate = React.useCallback(() => {
    setFormMode('create');
    setSelectedTemplate(null);
    setFormOpen(true);
  }, []);

  const openEdit = React.useCallback((template: FlowerTemplate) => {
    setFormMode('edit');
    setSelectedTemplate(template);
    setFormOpen(true);
  }, []);

  const value = React.useMemo(
    () => ({
      formOpen,
      setFormOpen,
      formMode,
      setFormMode,
      selectedTemplate,
      setSelectedTemplate,
      deleteTarget,
      setDeleteTarget,
      openCreate,
      openEdit,
    }),
    [formOpen, formMode, selectedTemplate, deleteTarget, openCreate, openEdit]
  );

  return (
    <FlowerTemplatesContext.Provider value={value}>
      {children}
    </FlowerTemplatesContext.Provider>
  );
}

export function useFlowerTemplatesPage() {
  const ctx = React.useContext(FlowerTemplatesContext);
  if (!ctx) {
    throw new Error('useFlowerTemplatesPage must be used within FlowerTemplatesProvider');
  }
  return ctx;
}

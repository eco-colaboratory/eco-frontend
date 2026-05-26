'use client';

import * as React from 'react';
import type { Item } from '@/lib/types/catalog/item';

type ItemsContextValue = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
  formMode: 'create' | 'edit';
  setFormMode: (mode: 'create' | 'edit') => void;
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
  deleteTarget: Item | null;
  setDeleteTarget: (item: Item | null) => void;
  openCreate: () => void;
  openEdit: (item: Item) => void;
};

const ItemsContext = React.createContext<ItemsContextValue | null>(null);

export function ItemsProvider({ children }: { children: React.ReactNode }) {
  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<'create' | 'edit'>('create');
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Item | null>(null);

  const openCreate = React.useCallback(() => {
    setFormMode('create');
    setSelectedItem(null);
    setFormOpen(true);
  }, []);

  const openEdit = React.useCallback((item: Item) => {
    setFormMode('edit');
    setSelectedItem(item);
    setFormOpen(true);
  }, []);

  const value = React.useMemo(
    () => ({
      formOpen,
      setFormOpen,
      formMode,
      setFormMode,
      selectedItem,
      setSelectedItem,
      deleteTarget,
      setDeleteTarget,
      openCreate,
      openEdit,
    }),
    [formOpen, formMode, selectedItem, deleteTarget, openCreate, openEdit]
  );

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
}

export function useItemsPage() {
  const ctx = React.useContext(ItemsContext);
  if (!ctx) {
    throw new Error('useItemsPage must be used within ItemsProvider');
  }
  return ctx;
}

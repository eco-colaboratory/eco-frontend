'use client';

import * as React from 'react';
import type { GiftCode } from '@/lib/types/catalog/gift-code';

type GiftCodesContextValue = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
  formMode: 'create' | 'edit';
  setFormMode: (mode: 'create' | 'edit') => void;
  selectedGiftCode: GiftCode | null;
  setSelectedGiftCode: (giftCode: GiftCode | null) => void;
  deleteTarget: GiftCode | null;
  setDeleteTarget: (giftCode: GiftCode | null) => void;
  openCreate: () => void;
  openEdit: (giftCode: GiftCode) => void;
};

const GiftCodesContext = React.createContext<GiftCodesContextValue | null>(null);

export function GiftCodesProvider({ children }: { children: React.ReactNode }) {
  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<'create' | 'edit'>('create');
  const [selectedGiftCode, setSelectedGiftCode] = React.useState<GiftCode | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<GiftCode | null>(null);

  const openCreate = React.useCallback(() => {
    setFormMode('create');
    setSelectedGiftCode(null);
    setFormOpen(true);
  }, []);

  const openEdit = React.useCallback((giftCode: GiftCode) => {
    setFormMode('edit');
    setSelectedGiftCode(giftCode);
    setFormOpen(true);
  }, []);

  const value = React.useMemo(
    () => ({
      formOpen,
      setFormOpen,
      formMode,
      setFormMode,
      selectedGiftCode,
      setSelectedGiftCode,
      deleteTarget,
      setDeleteTarget,
      openCreate,
      openEdit,
    }),
    [formOpen, formMode, selectedGiftCode, deleteTarget, openCreate, openEdit]
  );

  return <GiftCodesContext.Provider value={value}>{children}</GiftCodesContext.Provider>;
}

export function useGiftCodesPage() {
  const ctx = React.useContext(GiftCodesContext);
  if (!ctx) {
    throw new Error('useGiftCodesPage must be used within GiftCodesProvider');
  }
  return ctx;
}

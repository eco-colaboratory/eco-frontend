'use client';

import * as React from 'react';
import type { RewardTier } from '@/lib/types/catalog/reward-tier';

type RewardTiersContextValue = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
  formMode: 'create' | 'edit';
  setFormMode: (mode: 'create' | 'edit') => void;
  selectedRewardTier: RewardTier | null;
  setSelectedRewardTier: (tier: RewardTier | null) => void;
  deleteTarget: RewardTier | null;
  setDeleteTarget: (tier: RewardTier | null) => void;
  openCreate: () => void;
  openEdit: (tier: RewardTier) => void;
};

const RewardTiersContext = React.createContext<RewardTiersContextValue | null>(null);

export function RewardTiersProvider({ children }: { children: React.ReactNode }) {
  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<'create' | 'edit'>('create');
  const [selectedRewardTier, setSelectedRewardTier] = React.useState<RewardTier | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<RewardTier | null>(null);

  const openCreate = React.useCallback(() => {
    setFormMode('create');
    setSelectedRewardTier(null);
    setFormOpen(true);
  }, []);

  const openEdit = React.useCallback((tier: RewardTier) => {
    setFormMode('edit');
    setSelectedRewardTier(tier);
    setFormOpen(true);
  }, []);

  const value = React.useMemo(
    () => ({
      formOpen,
      setFormOpen,
      formMode,
      setFormMode,
      selectedRewardTier,
      setSelectedRewardTier,
      deleteTarget,
      setDeleteTarget,
      openCreate,
      openEdit,
    }),
    [formOpen, formMode, selectedRewardTier, deleteTarget, openCreate, openEdit]
  );

  return <RewardTiersContext.Provider value={value}>{children}</RewardTiersContext.Provider>;
}

export function useRewardTiersPage() {
  const ctx = React.useContext(RewardTiersContext);
  if (!ctx) {
    throw new Error('useRewardTiersPage must be used within RewardTiersProvider');
  }
  return ctx;
}

'use client';

import * as React from 'react';
import type { AdminCoinPackageDto } from '@/lib/types/catalog/coin-package';

type CoinPackagesContextValue = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
  formMode: 'create' | 'edit';
  setFormMode: (mode: 'create' | 'edit') => void;
  selectedPackage: AdminCoinPackageDto | null;
  setSelectedPackage: (pkg: AdminCoinPackageDto | null) => void;
  deleteTarget: AdminCoinPackageDto | null;
  setDeleteTarget: (pkg: AdminCoinPackageDto | null) => void;
  openCreate: () => void;
  openEdit: (pkg: AdminCoinPackageDto) => void;
};

const CoinPackagesContext = React.createContext<CoinPackagesContextValue | null>(null);

export function CoinPackagesProvider({ children }: { children: React.ReactNode }) {
  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<'create' | 'edit'>('create');
  const [selectedPackage, setSelectedPackage] = React.useState<AdminCoinPackageDto | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<AdminCoinPackageDto | null>(null);

  const openCreate = React.useCallback(() => {
    setFormMode('create');
    setSelectedPackage(null);
    setFormOpen(true);
  }, []);

  const openEdit = React.useCallback((pkg: AdminCoinPackageDto) => {
    setFormMode('edit');
    setSelectedPackage(pkg);
    setFormOpen(true);
  }, []);

  const value = React.useMemo(
    () => ({
      formOpen,
      setFormOpen,
      formMode,
      setFormMode,
      selectedPackage,
      setSelectedPackage,
      deleteTarget,
      setDeleteTarget,
      openCreate,
      openEdit,
    }),
    [formOpen, formMode, selectedPackage, deleteTarget, openCreate, openEdit]
  );

  return (
    <CoinPackagesContext.Provider value={value}>
      {children}
    </CoinPackagesContext.Provider>
  );
}

export function useCoinPackagesPage() {
  const ctx = React.useContext(CoinPackagesContext);
  if (!ctx) {
    throw new Error('useCoinPackagesPage must be used within CoinPackagesProvider');
  }
  return ctx;
}

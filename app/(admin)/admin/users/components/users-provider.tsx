'use client';

import * as React from 'react';

import type { AdminUser } from '@/lib/types/admin/user';

type UsersContextValue = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
  formMode: 'create' | 'edit';
  setFormMode: (mode: 'create' | 'edit') => void;
  selectedUser: AdminUser | null;
  setSelectedUser: (user: AdminUser | null) => void;
  banTarget: AdminUser | null;
  setBanTarget: (user: AdminUser | null) => void;
  openCreate: () => void;
  openEdit: (user: AdminUser) => void;
};

const UsersContext = React.createContext<UsersContextValue | null>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = React.useState<AdminUser | null>(null);
  const [banTarget, setBanTarget] = React.useState<AdminUser | null>(null);

  const openCreate = React.useCallback(() => {
    setFormMode('create');
    setSelectedUser(null);
    setFormOpen(true);
  }, []);

  const openEdit = React.useCallback((user: AdminUser) => {
    setFormMode('edit');
    setSelectedUser(user);
    setFormOpen(true);
  }, []);

  const value = React.useMemo(
    () => ({
      formOpen,
      setFormOpen,
      formMode,
      setFormMode,
      selectedUser,
      setSelectedUser,
      banTarget,
      setBanTarget,
      openCreate,
      openEdit,
    }),
    [formOpen, formMode, selectedUser, banTarget, openCreate, openEdit]
  );

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export function useUsersPage() {
  const ctx = React.useContext(UsersContext);
  if (!ctx) {
    throw new Error('useUsersPage must be used within UsersProvider');
  }
  return ctx;
}

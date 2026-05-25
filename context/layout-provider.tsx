'use client';

import * as React from 'react';

export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';

type LayoutContextValue = {
  sidebarVariant: SidebarVariant;
  setSidebarVariant: (variant: SidebarVariant) => void;
  collapsible: SidebarCollapsible;
  setCollapsible: (mode: SidebarCollapsible) => void;
};

const LayoutContext = React.createContext<LayoutContextValue | null>(null);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [sidebarVariant, setSidebarVariant] = React.useState<SidebarVariant>('sidebar');
  const [collapsible, setCollapsible] = React.useState<SidebarCollapsible>('icon');

  const value = React.useMemo(
    () => ({
      sidebarVariant,
      setSidebarVariant,
      collapsible,
      setCollapsible,
    }),
    [sidebarVariant, collapsible]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const ctx = React.useContext(LayoutContext);
  if (!ctx) {
    throw new Error('useLayout must be used within LayoutProvider');
  }
  return ctx;
}

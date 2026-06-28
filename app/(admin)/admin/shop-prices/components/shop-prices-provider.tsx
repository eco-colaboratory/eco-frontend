'use client';

import * as React from 'react';
import type { ShopCatalogItem } from '@/lib/types/catalog/shop-catalog';

type ShopPricesContextValue = {
  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  selectedItem: ShopCatalogItem | null;
  setSelectedItem: (item: ShopCatalogItem | null) => void;
  openEdit: (item: ShopCatalogItem) => void;
};

const ShopPricesContext = React.createContext<ShopPricesContextValue | null>(null);

export function ShopPricesProvider({ children }: { children: React.ReactNode }) {
  const [editOpen, setEditOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<ShopCatalogItem | null>(null);

  const openEdit = React.useCallback((item: ShopCatalogItem) => {
    setSelectedItem(item);
    setEditOpen(true);
  }, []);

  const value = React.useMemo(
    () => ({
      editOpen,
      setEditOpen,
      selectedItem,
      setSelectedItem,
      openEdit,
    }),
    [editOpen, selectedItem, openEdit]
  );

  return (
    <ShopPricesContext.Provider value={value}>
      {children}
    </ShopPricesContext.Provider>
  );
}

export function useShopPricesPage() {
  const ctx = React.useContext(ShopPricesContext);
  if (!ctx) {
    throw new Error('useShopPricesPage must be used within ShopPricesProvider');
  }
  return ctx;
}

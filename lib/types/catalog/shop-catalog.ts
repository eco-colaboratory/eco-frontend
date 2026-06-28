export interface ShopCatalogItem {
  id: string; // prefixedId (e.g. "item:...", "seed:...", "deco:...", "character:...", "package:...")
  name: string;
  price: number;
  category: 'Consumable' | 'Seed' | 'Decoration' | 'Character' | 'CoinPackage';
  imageUrl: string;
  isActive: boolean;
}

export interface UpdateShopPriceRequest {
  price: number;
}

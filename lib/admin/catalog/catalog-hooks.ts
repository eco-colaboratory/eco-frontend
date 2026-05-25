'use client';

import { createCatalogHooks } from './createCatalogHooks';
import {
  decorsService,
  flowerTemplatesService,
  itemsService,
  synergiesService,
} from './catalog-config';

export const itemsCatalog = createCatalogHooks({
  queryKey: 'admin-items',
  service: itemsService,
});

export const decorsCatalog = createCatalogHooks({
  queryKey: 'admin-decors',
  service: decorsService,
});

export const synergiesCatalog = createCatalogHooks({
  queryKey: 'admin-synergies',
  service: synergiesService,
});

export const flowerTemplatesCatalog = createCatalogHooks({
  queryKey: 'admin-flower-templates',
  service: flowerTemplatesService,
});

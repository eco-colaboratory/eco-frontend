import { createCatalogService } from './createCatalogService';
import type { Item, CreateItemRequest, UpdateItemRequest } from '@/lib/types/catalog/item';
import type { Decor, CreateDecorRequest, UpdateDecorRequest } from '@/lib/types/catalog/decor';
import type { Synergy, CreateSynergyRequest, UpdateSynergyRequest } from '@/lib/types/catalog/synergy';
import type {
  FlowerTemplate,
  CreateFlowerTemplateRequest,
  UpdateFlowerTemplateRequest,
} from '@/lib/types/catalog/flower-template';

const itemsService = createCatalogService<Item, CreateItemRequest, UpdateItemRequest>('api/items');
const decorsService = createCatalogService<Decor, CreateDecorRequest, UpdateDecorRequest>('api/decors');
const synergiesService = createCatalogService<Synergy, CreateSynergyRequest, UpdateSynergyRequest>(
  'api/synergies'
);
const flowerTemplatesService = createCatalogService<
  FlowerTemplate,
  CreateFlowerTemplateRequest,
  UpdateFlowerTemplateRequest
>('api/flowertemplates');

export { itemsService, decorsService, synergiesService, flowerTemplatesService };

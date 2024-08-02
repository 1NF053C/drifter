import { Prisma, MapboxPublicConfig, ShoeStore } from '@prisma/client';
import { getHostPort } from './getHostPort';
import { BaseApiClient } from './BaseApiClient';

export class MapboxPublicConfigService extends BaseApiClient<MapboxPublicConfig, Prisma.MapboxPublicConfigCreateInput, Prisma.MapboxPublicConfigUpdateInput> {
  constructor() {
    super(`${getHostPort()}/api/mapbox-public-config`);
  }
}

export class ShoeStoreService extends BaseApiClient<ShoeStore, Prisma.ShoeStoreCreateInput, Prisma.ShoeStoreUpdateInput> {
  constructor() {
    super(`${getHostPort()}/api/shoe-stores`);
  }
}

import { Prisma, MapboxPublicConfig, RunningShoeStore } from '@prisma/client';
import { getHostPort } from './getHostPort';
import { BaseApiClient } from './BaseApiClient';

export class MapboxPublicConfigService extends BaseApiClient<MapboxPublicConfig, Prisma.MapboxPublicConfigCreateInput, Prisma.MapboxPublicConfigUpdateInput> {
  constructor() {
    super(`${getHostPort()}/api/repositories/mapbox-public-config`);
  }
}

export class RunningShoeStoreService extends BaseApiClient<RunningShoeStore, Prisma.RunningShoeStoreCreateInput, Prisma.RunningShoeStoreUpdateInput> {
  constructor() {
    super(`${getHostPort()}/api/repositories/running-shoe-stores`);
  }
}

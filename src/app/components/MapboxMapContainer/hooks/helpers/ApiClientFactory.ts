import { Prisma, MapboxPublicConfig } from '@prisma/client';
import { getHostPort } from './getHostPort';
import { BaseApiClient } from './BaseApiClient';

export class MapboxPublicConfigService extends BaseApiClient<MapboxPublicConfig, Prisma.MapboxPublicConfigCreateInput, Prisma.MapboxPublicConfigUpdateInput> {
  constructor() {
    super(`${getHostPort()}/api/mapbox-public-config`);
  }
}

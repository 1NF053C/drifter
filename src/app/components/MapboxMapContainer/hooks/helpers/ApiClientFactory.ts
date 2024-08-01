import { Prisma, MapboxPublicConfig, Place } from '@prisma/client';
import { getHostPort } from './getHostPort';
import { BaseApiClient } from './BaseApiClient';

export class MapboxPublicConfigService extends BaseApiClient<MapboxPublicConfig, Prisma.MapboxPublicConfigCreateInput, Prisma.MapboxPublicConfigUpdateInput> {
  constructor() {
    super(`${getHostPort()}/api/mapbox-public-config`);
  }
}

export class PlaceService extends BaseApiClient<Place, Prisma.PlaceCreateInput, Prisma.PlaceUpdateInput> {
  constructor() {
    super(`${getHostPort()}/api/places`);
  }
}


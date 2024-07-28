import { MapboxPublicConfig, Prisma, PrismaClient } from "@prisma/client";
import { BaseDbClient } from "./BaseDbClient";

export class MapboxPublicConfigService extends BaseDbClient<MapboxPublicConfig, Prisma.MapboxPublicConfigCreateInput, Prisma.MapboxPublicConfigUpdateInput> {
    constructor(prisma: PrismaClient) {
        super(prisma, 'mapboxPublicConfig')
    }
}

import { MapboxPublicConfig, Prisma, PrismaClient, ShoeStore } from "@prisma/client";
import { BaseDbClient } from "./BaseDbClient";

export class MapboxPublicConfigService extends BaseDbClient<MapboxPublicConfig, Prisma.MapboxPublicConfigCreateInput, Prisma.MapboxPublicConfigUpdateInput> {
    constructor(prisma: PrismaClient) {
        super(prisma, 'mapboxPublicConfig')
    }
}

export class ShoeStoreService extends BaseDbClient<ShoeStore, Prisma.ShoeStoreCreateInput, Prisma.ShoeStoreUpdateInput> {
    constructor(prisma: PrismaClient) {
        super(prisma, 'shoeStore')
    }
}

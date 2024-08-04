import { MapboxPublicConfig, Prisma, PrismaClient, RunningShoeStore } from "@prisma/client";
import { BaseDbClient } from "./BaseDbClient";

export class MapboxPublicConfigService extends BaseDbClient<MapboxPublicConfig, Prisma.MapboxPublicConfigCreateInput, Prisma.MapboxPublicConfigUpdateInput> {
    constructor(prisma: PrismaClient) {
        super(prisma, 'mapboxPublicConfig')
    }
}

export class RunningShoeStoreService extends BaseDbClient<RunningShoeStore, Prisma.RunningShoeStoreCreateInput, Prisma.RunningShoeStoreUpdateInput> {
    constructor(prisma: PrismaClient) {
        super(prisma, 'runningShoeStore')
    }
}

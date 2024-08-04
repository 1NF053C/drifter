import { RunningShoeStoreService } from '../helpers/DbClientFactory';
import { PrismaClient } from '@prisma/client';

export async function seed_shoe_stores() {
    const prisma = new PrismaClient()
    const runningShoeStore = new RunningShoeStoreService(prisma);

    const confs = await runningShoeStore.findAll();
    for (const c of confs) {
        await runningShoeStore.delete(c.id);
    }
    await runningShoeStore.create({
        name: "abc",
        streetAddress: "(random mock data)221A Baker Street, London, UK",
        lng: -74.57880543786581,
        lat: 39.27652009732938
    });
    await runningShoeStore.create({
        name: "def",
        streetAddress: "(random mock data)221B Baker Street, London, UK",
        lng: -74.57369904382223,
        lat: 39.28116121809153
    });
    await runningShoeStore.create({
        name: "ghi",
        streetAddress: "(random mock data)221C Baker Street, London, UK",
        lng: -74.56329077966784,
        lat: 39.286222111797436
    });
    await print_all(runningShoeStore);
    await prisma.$disconnect();
}

async function print_all(runningShoeStore: RunningShoeStoreService) {
    const loadedConfs = await runningShoeStore.findAll();
    console.log("runningShoeStore", JSON.stringify(loadedConfs, null, 4));
}

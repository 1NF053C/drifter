import { ShoeStoreService } from '../helpers/DbClientFactory';
import { PrismaClient } from '@prisma/client';

export async function seed_shoe_stores() {
    const prisma = new PrismaClient()
    const shoeStoreService = new ShoeStoreService(prisma);

    const confs = await shoeStoreService.findAll();
    for (const c of confs) {
        await shoeStoreService.delete(c.id);
    }
    await shoeStoreService.create({
        name: "abc",
        streetAddress: "(random mock data)221A Baker Street, London, UK",
        lng: -74.57880543786581,
        lat: 39.27652009732938
    });
    await shoeStoreService.create({
        name: "def",
        streetAddress: "(random mock data)221B Baker Street, London, UK",
        lng: -74.57369904382223,
        lat: 39.28116121809153
    });
    await shoeStoreService.create({
        name: "ghi",
        streetAddress: "(random mock data)221C Baker Street, London, UK",
        lng: -74.56329077966784,
        lat: 39.286222111797436
    });
    await print_all(shoeStoreService);
    await prisma.$disconnect();
}

async function print_all(shoeStoreService: ShoeStoreService) {
    const loadedConfs = await shoeStoreService.findAll();
    console.log("shoeStore", JSON.stringify(loadedConfs, null, 4));
}

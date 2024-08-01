require('dotenv').config({ path: '.env.local' });

import { PlaceService } from '../helpers/DbClientFactory';
import { PrismaClient } from '@prisma/client'
import { faker } from "@faker-js/faker";

export async function seed_places() {
    const prisma = new PrismaClient()
    const placeService = new PlaceService(prisma);

    const places = await placeService.findAll();
    for (const p of places) {
        await placeService.delete(p.id);
    }
    await placeService.create({
        url: 'https://' + faker.string.uuid(),
        summary: faker.lorem.paragraph()
    });

    await prisma.$disconnect();

    console.log("Database seeded with places!")
}

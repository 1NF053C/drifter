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

    const mockNames = ["mock_url_one_ninety", "alphacoffee_three", "sigma_melon_fifty", "potato_abstract_42"];

    for (const name of mockNames) {
        await placeService.create({
            name: name + '.txt',
            rawText: faker.lorem.paragraphs() + ' '
                + "https://exampleUrl1" + '\n'
                + "Our mission is to promote the great outdoors." + ' '
                + "https://exampleUrl2" + '\n'
                + faker.lorem.paragraphs() + '\n'
                + faker.lorem.paragraphs() + '\n'
                + "Our company's main objective is to provide affordable running shoes for all." + '\n'
        });
    }

    await prisma.$disconnect();

    console.log("Database seeded with places!")
}

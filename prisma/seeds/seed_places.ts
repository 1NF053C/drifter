require('dotenv').config({ path: '.env.local' });

import fs from 'fs/promises';
import path from 'path';

import { PlaceService } from '../helpers/DbClientFactory';
import { PrismaClient } from '@prisma/client'

export async function seed_places() {
    const prisma = new PrismaClient()
    const placeService = new PlaceService(prisma);

    const places = await placeService.findAll();
    for (const p of places) {
        await placeService.delete(p.id);
    }

    const seedFiles = await readSeedFiles();

    const ops = [];
    for (const seedFile of seedFiles) {
        ops.push(
            await placeService.create({
                name: seedFile.name,
                rawText: seedFile.content.toString()
            })
        );
    }

    async function readSeedFiles() {
        try {
            const dirpath = path.join(__dirname, './files')
            const files = await fs.readdir(dirpath);
            const readFiles = files.map(async (file: string) => {
                const filepath = path.join(dirpath, file)
                const content = await fs.readFile(filepath);
                return { name: file, content: content }
            })
            const results = await Promise.all(readFiles);
            return results;
        }
        catch (error) {
            throw error;
        }
    }

    await prisma.$disconnect();

    console.log("Database seeded with places!")
}

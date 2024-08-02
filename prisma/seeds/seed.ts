require('dotenv').config({ path: '.env.local' });

import { MapboxPublicConfigService } from '../helpers/DbClientFactory';
import { getHostPort } from '@/app/components/MapboxMapContainer/hooks/helpers/getHostPort'
import { PrismaClient } from '@prisma/client'
import axios from 'axios';
import { seed_shoe_stores } from './seed_shoe_stores'

export async function seed() {
    const prisma = new PrismaClient()
    const mapboxPublicConfigService = new MapboxPublicConfigService(prisma);

    const MAPBOX_PUBLIC_KEY = process.env.MAPBOX_PUBLIC_KEY;
    if (!MAPBOX_PUBLIC_KEY) throw TypeError('process.env.MAPBOX_PUBLIC_KEY is invalid');

    const CITY_STATE = process.env.CITY_STATE;
    if (!CITY_STATE) throw TypeError('process.env.CITY_STATE is invalid');

    const confs = await mapboxPublicConfigService.findAll();
    for (const c of confs) {
        await mapboxPublicConfigService.delete(c.id);
    }
    const response = await axios.get(`${getHostPort()}/api/geocode`);
    const coords = response.data;

    await mapboxPublicConfigService.create({
        startLng: coords.lng,
        startLat: coords.lat,
        zoomLevel: 15,
        publicKey: MAPBOX_PUBLIC_KEY
    });
    await print_all(mapboxPublicConfigService);
    await prisma.$disconnect();
}

async function print_all(mapboxPublicConfigService: MapboxPublicConfigService) {
    const loadedConfs = await mapboxPublicConfigService.findAll();
    console.log("mapboxPublicConfig", JSON.stringify(loadedConfs, null, 4));
}

seed()
    .then(async () => await seed_shoe_stores())
    .catch(err => console.log(err))

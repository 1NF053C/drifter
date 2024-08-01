require('dotenv').config({ path: '.env.local' });

import { MapboxPublicConfigService, PlaceService } from '../helpers/DbClientFactory';
import { getHostPort } from '@/app/components/MapboxMapContainer/hooks/helpers/getHostPort'
import { PrismaClient } from '@prisma/client'
import axios from 'axios';
import { seed_places } from './seed_places';

// server must be running on localhost before seeding
export async function seed() {
    console.log('Seeding database...')

    // By default, seed mapbox config with existing public key and starting coords
    // Starting coords are based off of the provided city state string in the environment
    // Coords can be updated by user with CityStateUpdater component
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
        zoomLevel: 16,
        publicKey: MAPBOX_PUBLIC_KEY
    });

    await prisma.$disconnect();

    console.log("Database seeded with mapbox config!")
}

async function print_all() {
    const prisma = new PrismaClient()
    const mapboxPublicConfigService = new MapboxPublicConfigService(prisma);
    const placeService = new PlaceService(prisma);

    const loadedConfs = await mapboxPublicConfigService.findAll();
    console.log("mapboxPublicConfig", JSON.stringify(loadedConfs, null, 4));
    const loadedPlaces = await placeService.findAll();
    console.log("place", JSON.stringify(loadedPlaces, null, 4));
}

seed()
    .then(async () => await seed_places())
    .then(async () => await print_all())
    .catch(err => console.log(err))

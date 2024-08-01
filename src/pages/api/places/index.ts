import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import { PlaceService } from '@/../prisma/helpers/DbClientFactory';

const prisma = new PrismaClient()
const placeService = new PlaceService(prisma)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return getPlace(req, res);
        case 'POST':
            return createPlace(req, res)
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function getPlace(_req: NextApiRequest, res: NextApiResponse) {
    const place = await placeService.findAll()
    res.status(200).json(place)
}

async function createPlace(req: NextApiRequest, res: NextApiResponse) {
    try {
        const placeData = req.body
        const newPlace = await placeService.create(placeData)
        res.status(201).json(newPlace)
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

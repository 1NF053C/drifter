import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import { ShoeStoreService } from '@/../prisma/helpers/DbClientFactory';

const prisma = new PrismaClient()
const shoeStoreService = new ShoeStoreService(prisma)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return getShoeStore(req, res);
        case 'POST':
            return createShoeStore(req, res)
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function getShoeStore(req: NextApiRequest, res: NextApiResponse) {
    const shoeStore = await shoeStoreService.findAll()
    res.status(200).json(shoeStore)
}

async function createShoeStore(req: NextApiRequest, res: NextApiResponse) {
    try {
        const shoeStoreData = req.body
        const newShoeStore = await shoeStoreService.create(shoeStoreData)
        res.status(201).json(newShoeStore)
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

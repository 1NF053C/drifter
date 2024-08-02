import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';
import { ShoeStoreService } from '@/../prisma/helpers/DbClientFactory';

const prisma = new PrismaClient()
const shoeStoreService = new ShoeStoreService(prisma)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query

    switch (req.method) {
        case 'GET':
            return getShoeStore(req, res, Number(id))
        case 'PUT':
            return updateShoeStore(req, res, Number(id))
        case 'DELETE':
            return deleteShoeStore(req, res, Number(id))
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function getShoeStore(req: NextApiRequest, res: NextApiResponse, id: number) {
    const shoeStore = await shoeStoreService.findOne(id)
    if (shoeStore) {
        res.status(200).json(shoeStore)
    } else {
        res.status(404).json({ message: 'ShoeStore not found' })
    }
}

async function updateShoeStore(req: NextApiRequest, res: NextApiResponse, id: number) {
    try {
        const shoeStoreData = req.body;
        const updatedShoeStore = await shoeStoreService.update(id, shoeStoreData)
        res.status(201).json(updatedShoeStore)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

async function deleteShoeStore(req: NextApiRequest, res: NextApiResponse, id: number) {
    await shoeStoreService.delete(id)
    res.status(204).end()
}

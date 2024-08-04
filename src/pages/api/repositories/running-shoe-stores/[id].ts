import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';
import { RunningShoeStoreService } from '@/../prisma/helpers/DbClientFactory';

const prisma = new PrismaClient()
const runningShoeStoreService = new RunningShoeStoreService(prisma)

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
    const runningShoeStore = await runningShoeStoreService.findOne(id)
    if (runningShoeStore) {
        res.status(200).json(runningShoeStore)
    } else {
        res.status(404).json({ message: 'ShoeStore not found' })
    }
}

async function updateShoeStore(req: NextApiRequest, res: NextApiResponse, id: number) {
    try {
        const runningShoeStoreData = req.body;
        const updatedShoeStore = await runningShoeStoreService.update(id, runningShoeStoreData)
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
    await runningShoeStoreService.delete(id)
    res.status(204).end()
}

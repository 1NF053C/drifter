import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import { RunningShoeStoreService } from '@/../prisma/helpers/DbClientFactory';

const prisma = new PrismaClient()
const runningShoeService = new RunningShoeStoreService(prisma)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return getRunningShoeStore(req, res);
        case 'POST':
            return createRunningShoeStore(req, res)
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

async function getRunningShoeStore(req: NextApiRequest, res: NextApiResponse) {
    const runningShoeStore = await runningShoeService.findAll()
    res.status(200).json(runningShoeStore)
}

async function createRunningShoeStore(req: NextApiRequest, res: NextApiResponse) {
    try {
        const runningShoeStoreData = req.body
        const newShoeStore = await runningShoeService.create(runningShoeStoreData)
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

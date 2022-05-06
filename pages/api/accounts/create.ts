// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createApiHelper } from "@/helpers/api-helper"
import { PrismaClient } from '@prisma/client';
type Data = {
    name: string
}

const prisma: PrismaClient = new PrismaClient();
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const api = createApiHelper(req, res);
    api.post((request, response) => {
        try {
            response.status(200).json({ ...request.body})
        } catch (error: any) {
            response.status(500).json({ error: error.message })
        } finally {
            prisma.$disconnect();
        }
    });
}

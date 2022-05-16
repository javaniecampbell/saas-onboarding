import type { NextApiRequest, NextApiResponse } from 'next'
import { createApiHelper } from '@/helpers/api-helper'
import { auth0 } from '@/helpers/auth0-client'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { PrismaClient } from '@prisma/client';
type Team = {
    name: string
    email: string
    auth0Id?: string
}

const prisma: PrismaClient = new PrismaClient();
export default withApiAuthRequired(function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const api = createApiHelper(req, res);
    const session = getSession(req, res);
    api.post(async (request, response) => {
        const teams: Team[] = [];
        try {
            const team: Team = request.body;
            const user = await auth0.getUser({ id: session?.user?.sub });
            const found = await prisma.accounts.findUnique({
                where: {
                    auth0Id: user?.user_id
                }
            });
            const hasAccount = found !== null ? true : false;
            if (hasAccount) {
                await auth0.updateAppMetadata({
                    id: user?.user_id!
                }, {
                    teams
                })
            }

            response.status(200).json({});
        } catch (error: any) {
            await auth0.updateAppMetadata({
                id: session?.user?.sub
            }, {
                teams
            })
            response.status(500).json({ error: error.message })
        } finally {
            prisma.$disconnect();
        }
    });
})

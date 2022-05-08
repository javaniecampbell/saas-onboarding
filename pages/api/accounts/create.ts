import type { NextApiRequest, NextApiResponse } from 'next'
import { createApiHelper } from '@/helpers/api-helper'
import { auth0 } from '@/helpers/auth0-client'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { PrismaClient } from '@prisma/client';
// import { createAccount } from '@/services/accounts';
type Account = {
    firstName: string
    lastName: string
    isAdmin: string
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
        try {
            const account: Account = request.body;
            const user = await auth0.getUser({ id: session?.user?.sub });
            const found = await prisma.accounts.findUnique({
                where: {
                    auth0Id: user?.user_id
                }
            });
            const hasAccount = found !== null ? true : false;
            if (!hasAccount) {
                const createdAccount = await prisma.accounts.create({
                    data: {
                        firstName: account.firstName,
                        lastName: account.lastName,
                        isAdmin: account.isAdmin === 'on' ? true : false,
                        email: account.email,
                        isActive: user?.email_verified,
                        avatarUrl: user?.picture,
                        lastLoginAt: new Date(),
                        isStaff: false,
                        auth0Id: user?.user_id
                    }
                });
                if (createdAccount) {
                    await auth0.updateUser({
                        id: session?.user?.sub,
                    }, {
                        given_name: createdAccount.firstName ?? account.firstName,
                        family_name: createdAccount.lastName ?? account.lastName,
                        email: createdAccount.email,
                    })
                    await auth0.updateAppMetadata({
                        id: user?.user_id!
                    }, {
                        isAdmin: request.body.isAdmin === 'on' ? true : false,
                        accountCreated: true
                    })
                }

            } else if (hasAccount) {
                await auth0.updateUser({
                    id: session?.user?.sub,
                }, {
                    given_name: found?.firstName ?? account.firstName,
                    family_name: found?.lastName ?? account.lastName,
                    email: found?.email,
                })
                await auth0.updateAppMetadata({
                    id: user?.user_id!
                }, {
                    isAdmin: request.body.isAdmin === 'on' ? true : false,
                    accountCreated: true
                })
            }

            response.status(200).redirect('/teams');
        } catch (error: any) {
            auth0.updateAppMetadata({
                id: session?.user?.sub
            }, {
                accountCreated: false
            })
            response.status(500).json({ error: error.message })
        } finally {
            prisma.$disconnect();
        }
    });
})

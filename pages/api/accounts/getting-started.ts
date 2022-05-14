import type { NextApiRequest, NextApiResponse } from 'next'
import { createApiHelper } from '@/helpers/api-helper'
import { auth0 } from '@/helpers/auth0-client'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { PrismaClient } from '@prisma/client';
import { createStripeCustomer } from '@/services/customer';
import { Plan, subsribeToPlan } from '@/services/subscription';
import { capitalize } from '@/helpers/index';

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
    api.post(async (_, response) => {
        try {
            // const account: Account = request.body;
            const user = await auth0.getUser({ id: session?.user?.sub });
            const customer = await createStripeCustomer({
                email: user?.email!,
                firstName: user?.given_name,
                lastName: user?.family_name,
                auth0Id: user?.user_id
            });

            if (customer) {
                const subscription = await subsribeToPlan({
                    plan: Plan.FREE,
                    customerId: customer.customer.id
                });
                if (subscription) {
                    const account = await prisma.accounts.findUnique({
                        where: {
                            auth0Id: user?.user_id
                        }
                    });
                    if (account) {
                        const tier = await prisma.tiers.findFirst({
                            where: {
                                name: capitalize(Plan.FREE)
                            }
                        });
                        if (tier) {
                            await prisma.subscriptions.create({
                                data: {
                                    updatedAt: new Date(),
                                    name: capitalize(Plan.FREE) + ' subsciption for ' + account.email,
                                    slug: Plan.FREE + '-' + account.email,
                                    stripeCustomerId: customer.customer.id,
                                    stripeSubscriptionId: subscription.id,
                                    tier: {
                                        connect: {
                                            id: tier.id
                                        }
                                    },
                                }
                            });
                            await auth0.updateAppMetadata({
                                id: user?.user_id!
                            }, {
                                stripeCustomerId: customer.customer.id
                            })

                        }
                    }
                }

            } else if (customer === null) {
                await auth0.updateAppMetadata({
                    id: user?.user_id!
                }, {
                    stripeCustomerId: null
                })
            }
            response.status(200).redirect('/teams');
        } catch (error: any) {
            auth0.updateAppMetadata({
                id: session?.user?.sub
            }, {
                stripeCustomerId: null
            })
            response.status(500).json({ error: error.message })
        } finally {
            prisma.$disconnect();
        }
    });
})

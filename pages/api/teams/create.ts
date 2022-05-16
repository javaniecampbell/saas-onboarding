import type { NextApiRequest, NextApiResponse } from 'next'
import { createApiHelper } from '@/helpers/api-helper'
import { auth0 } from '@/helpers/auth0-client'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { PrismaClient } from '@prisma/client';
type CreateNewTeamCommand = {
    teamName: string
    slug: string
    auth0Id?: string
}

type TeamCreatedResponse = {
    team: {
        id: number
        name: string
        slug: string
        createdAt: Date | null
        updatedAt: Date | null
    }
}

const prisma: PrismaClient = new PrismaClient();
export default withApiAuthRequired(function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const api = createApiHelper(req, res);
    const session = getSession(req, res);
    api.post(async (request, response) => {
        const teams: string[] = [];
        try {
            const createNewCommand: CreateNewTeamCommand = request.body;
            const user = await auth0.getUser({ id: session?.user?.sub });
            const found = await prisma.accounts.findUnique({
                where: {
                    auth0Id: user?.user_id
                }
            });
            const hasAccount = found !== null ? true : false;
            if (hasAccount) {
                //TODO: Create slug const teamSlug = team.teamName.toLowerCase().replace(/\s/g, '-');
                const model = {
                    name: createNewCommand.teamName,
                    slug: createNewCommand.slug
                };
                // Check if the team already exists
                const existingTeam = await prisma.teams.findFirst({
                    where: {
                        slug: createNewCommand.slug
                    }
                });
                if (existingTeam) {
                    return response.status(400).json({
                        message: 'Team already exists'
                    });
                }
                // Get current user from auth0 and check app_metatdata for stripeCustomerId
                const currentUser = await auth0.getUser({ id: session?.user?.sub });
                if (currentUser?.app_metadata?.stripeCustomerId) {
                    const subscription = await prisma.subscriptions.findFirst({
                        where: {
                            stripeCustomerId: currentUser?.app_metadata?.stripeCustomerId
                        }
                    })
                    if (!subscription) {
                        return response.status(400).json({
                            error: 'You must have a subscription to create a team.'
                        });
                    }
                    const teamCreated = await prisma.teams.create({
                        data: {
                            ...model,
                            subscription: {
                                connect: {
                                    id: subscription?.id
                                }
                            }
                        }
                    });
                    // check if account has any other teams
                    const allTeams = await prisma.teams.findMany({
                        where: {
                            subscriptionId: subscription?.id
                        }
                    });
                    if (allTeams && allTeams.length > 0) {
                        allTeams.forEach(async (team) => {
                            teams.push(team.slug);
                        });
                    } else {
                        teams.push(createNewCommand.slug);
                    }
                    // add team to account
                    await auth0.updateAppMetadata({
                        id: user?.user_id!
                    }, {
                        teams
                    });
                    const teamCreatedResponse: TeamCreatedResponse = {
                        team: {
                            ...teamCreated
                        }
                    };
                    response.status(200).json(teamCreatedResponse);
                } else {
                    throw new Error('Please contact your team administrator to create a team.');
                }

            } else {
                console.log("No account was found for this user.");
                throw new Error('Please contact your team administrator to create a team.');
            }
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

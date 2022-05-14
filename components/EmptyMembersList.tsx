import { Plan } from '@/services/subscription'
import { useUser } from '@auth0/nextjs-auth0'
import React, { useEffect, useState } from 'react'

function EmptyMembersList() {
    const { user, isLoading } = useUser()
    const [hasAccount, hasAccountSet] = useState(false)
    const [accountType, accountTypeSet] = useState(Plan.FREE)
    const namespace = 'https://api.pms/'
    useEffect(() => {

        if (!isLoading && user) {
            const withAccount = (user as any)[namespace + 'accountCreated'];
            const plan: string = (user as any)[namespace + 'plan'];
            const type = plan ? Plan[plan.toUpperCase() as keyof typeof Plan] : Plan.FREE;
            console.log(plan, type);
            accountTypeSet(type);
            hasAccountSet(withAccount);
            console.log(user)
        }

    }, [isLoading, user, accountType, hasAccount])


    return (
        <div className="max-w-lg mx-auto">
            <div>
                <div className="text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                    <h2 className="mt-2 text-lg font-medium text-gray-900">Add team members</h2>
                    {(accountType === Plan.FREE) ? (<p className="mt-1 text-sm text-gray-500">
                        You have to upgrade your plan to add team members to your team.
                    </p>) : (<p className="mt-1 text-sm text-gray-500">
                        You haven’t added any team members to your team yet. As the owner of this account, you can manage team
                        member permissions.
                    </p>)}
                </div>
                {(!hasAccount) ? (
                    <form action="/api/accounts/getting-started" method="post" className="mt-6 flex">

                        <button
                            type="submit"
                            className="w-full flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Let's get started
                        </button>
                    </form>
                ) : null}

                {((hasAccount === true && accountType === Plan.FREE)) ? (
                    <form action="#" method="post" className="mt-6 flex">

                        <button
                            type="submit"
                            className="w-full flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Update Plan
                        </button>
                    </form>
                ) : null}


                {/* <form action="#" className="mt-6 flex">
                    <label htmlFor="email" className="sr-only">
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter an email"
                    />
                    <button
                        type="submit"
                        className="ml-4 flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Send invite
                    </button>
                </form> */}
            </div>
        </div>
    )
}

export default EmptyMembersList
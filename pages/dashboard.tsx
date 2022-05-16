import Layout from '@/components/Layout'
import {
    CogIcon,
    CreditCardIcon,
    ReceiptRefundIcon,
    UsersIcon
} from '@heroicons/react/outline'
import { NextPage } from 'next'
import React from 'react'
import { ActionCardList } from '../components/ActionCardList'


const actions = [

    {
        title: 'View a team',
        href: '/teams',
        icon: UsersIcon,
        iconForeground: 'text-sky-700',
        iconBackground: 'bg-sky-50',
    },
    {
        title: 'Billing',
        href: '/billing',
        icon: CreditCardIcon,
        iconForeground: 'text-yellow-700',
        iconBackground: 'bg-yellow-50'
    },
    {
        title: 'Manage plan',
        href: '#',
        icon: ReceiptRefundIcon,
        iconForeground: 'text-rose-700',
        iconBackground: 'bg-rose-50',
    },
    {
        title: 'Settings',
        href: '/settings',
        // icon: BadgeCheckIcon,
        icon: CogIcon,
        iconForeground: 'text-purple-700',
        iconBackground: 'bg-purple-50',
    },
    // {
    //     title: 'Request time off',
    //     href: '#',
    //     icon: ClockIcon,
    //     iconForeground: 'text-teal-700',
    //     iconBackground: 'bg-teal-50',
    // },

    // {
    //   title: 'Training',
    //   href: '#',
    //   icon: AcademicCapIcon,
    //   iconForeground: 'text-indigo-700',
    //   iconBackground: 'bg-indigo-50',
    // },
]


const Dashboard: NextPage = () => {
    return (
        <Layout>
            <div className="mt-4">
                <ActionCardList actions={actions} />
            </div>
        </Layout>
    )
}

export default Dashboard
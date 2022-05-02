import React from 'react'
import { Member } from './_types'

function MemberItem({ member }: { member: Member }) {
    return (
        <div><tr key={member.email}>
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                {member.name}
                <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Title</dt>
                    <dd className="mt-1 truncate text-gray-700">{member.title}</dd>
                    <dt className="sr-only sm:hidden">Email</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">{member.email}</dd>
                </dl>
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{member.title}</td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{member.email}</td>
            <td className="px-3 py-4 text-sm text-gray-500">{member.role}</td>
            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit<span className="sr-only">, {member.name}</span>
                </a>
            </td>
        </tr></div>
    )
}

export default MemberItem
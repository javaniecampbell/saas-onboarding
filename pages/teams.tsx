import CreateTeamForm from "@/components/CreateTeamForm"
import EmptyMembersList from "@/components/EmptyMembersList"
import Layout from "@/components/Layout"
import { MemberList } from "@/components/MemberList"
import Modal from "@/components/Modal"
import { Member } from "@/components/_types"
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPage } from "next"
import { useEffect, useState } from 'react'

const Teams: NextPage = () => {
    const [members, setMembers] = useState<Member[]>([])
    useEffect(() => {
        setMembers([
        //     {
        //     name: 'Team',
        //     email: "email@sample.com",
        //     title: "Sample Title",
        //     role: "Blank Role"
        // }
    ])

        //return () => {}
    }, [])

    return (
        <Layout title={`Teams`}>
            <div className="mt-4 sm:mt-6 lg:mt-8">
                {members.length <= 0 ? (<EmptyMembersList />) : (
                    <>
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">Members</h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    A list of all the members in your team including their name, title, email and role.
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                >
                                    Add member
                                </button>
                            </div>
                        </div>
                        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                            <MemberList members={members}  />
                        </div>
                    </>
                )}
            </div>
            <Modal title="New team" isOpen={true} >
                <CreateTeamForm   />
            </Modal>
        </Layout>
    )
}

export default withPageAuthRequired(Teams)
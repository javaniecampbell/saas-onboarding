import React from 'react'

const CreateTeamForm = ({ formName, name, slug, onChange }: { formName: string, name: string, slug: string, onChange?: React.ChangeEventHandler<HTMLInputElement> }) => {
    return (
        <div>
            <form id={formName} className="space-y-6" action="/api/teams/create" method="POST">
                <div>
                    <label htmlFor="teamName" className="block text-left text-sm font-medium text-gray-700">
                        Team Name
                    </label>
                    <div className="mt-1">
                        <input
                            id="teamName"
                            name="teamName"
                            type="text"
                            autoComplete="off"
                            placeholder="Team Name"
                            value={name ?? ""}
                            onChange={onChange}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="slug" className="block text-left text-sm font-medium text-gray-700">
                        Slug
                    </label>
                    <div className="mt-1">
                        <input
                            id="slug"
                            name="slug"
                            type="text"
                            placeholder="team-name"
                            autoComplete="off"
                            value={slug ?? ""}
                            readOnly
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateTeamForm
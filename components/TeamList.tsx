import React from 'react';
import { TeamItem } from "./TeamItem";
import { Team } from './_types';


export function TeamList({ teams }: { teams: Team[]; }) {
    return (
        <ul className="divide-y divide-gray-200">
            {teams.map((team) => <TeamItem key={team.id} team={team} />)}
        </ul>
    );
}

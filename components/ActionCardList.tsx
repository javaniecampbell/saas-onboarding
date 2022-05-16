
import React from 'react';
import { ActionCard } from "./ActionCard";
import { Action } from './_types';

export function ActionCardList({ actions }: { actions: Action[]; }) {
    return (
        <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
            {actions.map((action, actionIdx) => (
                <ActionCard key={action.title} action={action} actionIdx={actionIdx} length={actions.length} />
            ))}
        </div>
    );
}

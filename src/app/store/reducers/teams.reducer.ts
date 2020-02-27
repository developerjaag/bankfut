import { createReducer, on, Action } from '@ngrx/store';

import { addGoals, addOneGoal } from '@store/actions/goals/goals.actions';
import { GoalState, goalAdapter } from '@store/states/goals.state';

import {  } from '@store/actions/teams.actions';


export const initialState: GoalState = goalAdapter.getInitialState({
    // additional entity state properties
});


export const iGoalReducer = createReducer(
    initialState,
    on(addGoals, (state, { goals }) => {
        return goalAdapter.addAll(goals, state);
    }),

    on(addOneGoal, (state, { goal }) => {
        return goalAdapter.addOne(goal, state);
    })

);

export function goalReducer(state: GoalState | undefined, action: Action) {
    return iGoalReducer(state, action);
}

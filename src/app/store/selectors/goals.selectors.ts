import { createSelector } from '@ngrx/store';

import { getGoalsState } from '@store/reducers/app.reducers';
import { goalAdapter } from '@store/states/goals.state';


export const geGoalsState = createSelector(
    getGoalsState,
    goalState => goalState
);


export const {
    selectAll: getAllGoals,
    selectTotal: getCountAllGoals,
    selectEntities: getGoalsEntities
} = goalAdapter.getSelectors(geGoalsState);

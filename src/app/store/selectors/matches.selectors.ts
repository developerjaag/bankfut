import { createSelector } from '@ngrx/store';

import { getMatchesState } from '@store/reducers/app.reducers';
import { matchAdapter } from '@store/states/matches.state';


export const geGoalsState = createSelector(
    getMatchesState,
    matchesState => matchesState
);


export const {
    selectAll: getAllMatches,
    selectTotal: getCountAllMatches,
    selectEntities: getMatchsEntities
} = matchAdapter.getSelectors(getMatchesState);

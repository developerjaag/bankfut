import { createSelector } from '@ngrx/store';

import { getTeamsState } from '@store/reducers/app.reducers';
import { teamAdapter } from '@store/states/teams.state';


export const geGoalsState = createSelector(
    getTeamsState,
    teamsState => teamsState
);


export const {
    selectAll: getAllTeams,
    selectTotal: getCountAllTeams,
    selectEntities: getTeamsEntities
} = teamAdapter.getSelectors(getTeamsState);

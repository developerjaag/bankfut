import { createReducer, on, Action } from '@ngrx/store';


import { TeamsState, teamAdapter } from '@store/states/teams.state';
import { addTeams } from '@store/actions/teams/teams.actions';


export const initialState: TeamsState = teamAdapter.getInitialState({
    // additional entity state properties
});


export const iTeamsReducer = createReducer(
    initialState,
    on(addTeams, (state, { teams }) => {
        return teamAdapter.addAll(teams, state);
    })

);

export function teamsReducer(state: TeamsState | undefined, action: Action) {
    return iTeamsReducer(state, action);
}

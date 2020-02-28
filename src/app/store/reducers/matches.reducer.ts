import { createReducer, on, Action } from '@ngrx/store';


import { MatchesState, matchAdapter } from '@store/states/matches.state';
import { addMatches } from '@store/actions/matches/matches.actions';


export const initialState: MatchesState = matchAdapter.getInitialState({
    // additional entity state properties
});


export const iMatchesReducer = createReducer(
    initialState,
    on(addMatches, (state, { matches }) => {
        return matchAdapter.addAll(matches, state);
    })

);

export function matchesReducer(state: MatchesState | undefined, action: Action) {
    return iMatchesReducer(state, action);
}

import { createReducer, on, Action } from '@ngrx/store';

import { AuthState } from '@store/states/auth.state';
import { authSetProfile, authLogOut } from '@store/actions/auth';

export const initialState: AuthState = {
    profile: null
};

export const iauthReducer = createReducer(
    initialState,
    on(authSetProfile, (state, { profile }) => {
        return {
            ...state,
            profile
        };
    }),
    on(authLogOut, () => {
        return {
            profile: null
        };
    })
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return iauthReducer(state, action);
}

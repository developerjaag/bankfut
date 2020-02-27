import { createSelector } from '@ngrx/store';

import { getAuthState } from '@store/reducers/app.reducers.ts';


export const getProfile = createSelector(
    getAuthState,
    authState => authState.profile
);

import { ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import { environment } from '@environments/environment';

import * as fromRouter from '@ngrx/router-store';

// reducers
import { authReducer } from './auth.reducer';
import { uiReducer } from './ui.reducer';
import { goalReducer } from './goals.reducer';


// states
import { AppState } from '@store/states/app.state';
import { AuthState } from '@store/states/auth.state';
import { UIState } from '@store/states/ui.state';
import { GoalState } from '@store/states/goals.state';


export const appReducers: ActionReducerMap<AppState> = {
    router: fromRouter.routerReducer,
    auth: authReducer,
    ui: uiReducer,
    goals: goalReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

// getters for parts of the state
export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getUIState = createFeatureSelector<UIState>('ui');
export const getGoalsState = createFeatureSelector<GoalState>('goals');

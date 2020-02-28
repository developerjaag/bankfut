import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './router.state';

import { UIState } from './ui.state';
import { AuthState } from './auth.state';
import { GoalState } from './goals.state';
import { TeamsState } from './teams.state';
import { RuleState } from './rules.state';

export interface AppState {
  auth: AuthState;
  ui: UIState;
  router: RouterReducerState<RouterStateUrl>;
  goals: GoalState;
  teams: TeamsState;
  rules: RuleState;
}

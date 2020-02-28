import { createAction, props } from '@ngrx/store';

import { Team } from '@models/team.model';

export const requestAddTeams = createAction(
    '[TeamsModule] requestAddTeams'
);

export const addTeams = createAction(
    '[TeamsModule] addTeams',
    props<{ teams: Team[] }>()
);

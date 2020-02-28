import { createAction, props } from '@ngrx/store';

import { Match } from '@models/match.model';

export const requestAddMatches = createAction(
    '[MatchesModule] requestAddMatches'
);

export const addMatches = createAction(
    '[MatchesModule] addMatches',
    props<{ matches: Match[] }>()
);

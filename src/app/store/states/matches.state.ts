import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Match } from '@models/match.model';

export interface MatchesState extends EntityState<Match> { }

export const matchAdapter: EntityAdapter<Match> = createEntityAdapter<Match>({
    selectId: (match) => match.id
});

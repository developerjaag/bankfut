import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Team } from '@models/team.model';

export interface TeamsState extends EntityState<Team> { }

export const teamAdapter: EntityAdapter<Team> = createEntityAdapter<Team>({
    selectId: (team) => team.id
});

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Goal } from '@models/goal.model';

export interface GoalState extends EntityState<Goal> { }

export const goalAdapter: EntityAdapter<Goal> = createEntityAdapter<Goal>({
    selectId: (goal) => goal.uid
});

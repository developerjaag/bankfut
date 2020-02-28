import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';


import { Goal } from '@models/goal.model';

export const requestAddGoals = createAction(
    '[GoalsModule] requestAddGoals',
    props<{ uidUser: string }>()
);

export const addGoals = createAction(
    '[GoalsModule] addGoals',
    props<{ goals: Goal[] }>()
);

export const requestAddOneGoal = createAction(
    '[GoalsModule] requestAddOneGoal',
    props<{ goal: Goal }>()
);

export const addOneGoal = createAction(
    '[GoalsModule] addOneGoal',
    props<{ goal: Goal }>()
);

export const requestEditOneGoal = createAction(
    '[GoalsModule] requestEditOneGoal',
    props<{ goal: Goal }>()
);

export const editOneGoal = createAction(
    '[GoalsModule] editOneGoal',
    props<{ goal: Update<Goal> }>()
);

import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';


import { Rule } from '@models/rule.model';

export const requestAddRules = createAction(
    '[RulesModule] requestAddRules',
    props<{ uidUser: string }>()
);

export const addRules = createAction(
    '[RulesModule] addRules',
    props<{ rules: Rule[] }>()
);

export const requestAddOneRule = createAction(
    '[RulesModule] requestAddOneRule',
    props<{ rule: Rule }>()
);

export const addOneRule = createAction(
    '[RulesModule] addOneRule',
    props<{ rule: Rule }>()
);

export const requestEditOneRule = createAction(
    '[RulesModule] requestEditOneRule',
    props<{ rule: Rule }>()
);

export const editOneRule = createAction(
    '[RulesModule] editOneRule',
    props<{ rule: Update<Rule> }>()
);

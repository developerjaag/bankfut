import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Rule } from '@models/rule.model';

export interface RuleState extends EntityState<Rule> { }

export const ruleAdapter: EntityAdapter<Rule> = createEntityAdapter<Rule>({
    selectId: (rule) => rule.uid
});

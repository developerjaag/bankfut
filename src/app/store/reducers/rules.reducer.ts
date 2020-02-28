import { createReducer, on, Action } from '@ngrx/store';

import { addRules, addOneRule, editOneRule } from '@store/actions/rules/rules.actions';
import { RuleState, ruleAdapter } from '@store/states/rules.state';


export const initialState: RuleState = ruleAdapter.getInitialState({
    // additional entity state properties
});


export const iRuleReducer = createReducer(
    initialState,
    on(addRules, (state, { rules }) => {
        return ruleAdapter.addAll(rules, state);
    }),

    on(addOneRule, (state, { rule }) => {
        return ruleAdapter.addOne(rule, state);
    }),

    on(editOneRule, (state, { rule }) => {
        return ruleAdapter.updateOne(rule, state);
    })

);

export function ruleReducer(state: RuleState | undefined, action: Action) {
    return iRuleReducer(state, action);
}

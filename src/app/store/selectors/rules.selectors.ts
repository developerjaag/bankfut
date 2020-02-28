import { createSelector } from '@ngrx/store';

import { getRulesState } from '@store/reducers/app.reducers';
import { ruleAdapter } from '@store/states/rules.state';


export const geRulesState = createSelector(
    getRulesState,
    ruleState => ruleState
);


export const {
    selectAll: getAllRules,
    selectTotal: getCountAllRules,
    selectEntities: getRulesEntities
} = ruleAdapter.getSelectors(getRulesState);


export const getRulesByGoal = createSelector(
    getAllRules,
    (rules, props) => {
        const rulesFiltered = rules;
        return rulesFiltered.filter(rule => rule.uidGoal === props.uidGoal);
    }
);

export const getRulesByGoalTeamAndEvent = createSelector(
    getAllRules,
    (rules, props) => {
        const rulesFiltered = rules;
        return rulesFiltered.find(rule => rule.uidGoal === props.uidGoal && rule.team.id === props.teamId && rule.event === props.event);
    }
);

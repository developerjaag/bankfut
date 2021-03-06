import { AuthEffects } from './auth.effects';
import { GoalEffects } from './goal.effects';
import { TeamsEffects } from './teams.effects';
import { RuleEffects } from './rule.effects';
import { MatchesEffects } from './matches.effects';

export const EFFECTS: any[] = [
    AuthEffects,
    GoalEffects,
    TeamsEffects,
    RuleEffects,
    MatchesEffects
];

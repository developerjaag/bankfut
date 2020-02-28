import { GoalsGuard } from './goals.guard';
import { TeamsGuard } from './teams.guard';
import { RulesGuard } from './rules.guard';
import { MatchesGuard } from './matches.guard';

export const guards: any[] = [
    GoalsGuard,
    TeamsGuard,
    RulesGuard,
    MatchesGuard
];

export { GoalsGuard } from './goals.guard';
export { TeamsGuard } from './teams.guard';
export { RulesGuard } from './rules.guard';
export { MatchesGuard } from './matches.guard';



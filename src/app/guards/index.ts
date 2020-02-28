import { GoalsGuard } from './goals.guard';
import { TeamsGuard } from './teams.guard';
import { RulesGuard } from './rules.guard';

export const guards: any[] = [
    GoalsGuard,
    TeamsGuard,
    RulesGuard
];

export { GoalsGuard } from './goals.guard';
export { TeamsGuard } from './teams.guard';
export { RulesGuard } from './rules.guard';



import { Team } from './team.model';

export interface Rule {
    uid?: string;
    uidGoal: string;
    team: Team;
    event: 'Jugar' | 'Por gol' | 'Ganar';
    totalSaved?: number;
    valueToSave: number;
}

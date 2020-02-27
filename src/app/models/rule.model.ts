export interface Rule {
    uid?: string;
    team: string;
    event: 'Play' | 'Goal' | 'Win';
    valueToSave: number;
}

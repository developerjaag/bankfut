export interface Match {
    id: number;
    homeTeam: MatchTeam;
    awayTeam: MatchTeam;
    score: {
        winner: 'DRAW' | 'HOME_TEAM' | 'AWAY_TEAM';
        fullTime: {
            homeTeam: number;
            awayTeam: number;
        }
    };
    utcDate: Date;
}

interface MatchTeam {
    id: number;
    name: string;
}

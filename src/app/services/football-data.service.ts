import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Team } from '@models/team.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FootballDataService {


    constructor(
        @Inject('API_TOKEN') private apiToken: string,
        private http: HttpClient
    ) { }

    getTeams() {
        const url = 'https://api.football-data.org/v2/competitions/2001/teams';
        const header = {
            headers: new HttpHeaders()
                .set('X-Auth-Token', `${this.apiToken}`)
        };
        return this.http.get(url, header).pipe(
            map((result: any) => {
                // delete unnecessary data
                for (const team of result.teams) {
                    for (const key in team) {
                        if (key !== 'id' && key !== 'shortName' && key !== 'name') {
                            delete (team[key]);
                        }
                    }
                }
                return result;
            })
        );
    }

    getMatches() {
        const url = 'https://api.football-data.org/v2/competitions/2001/matches';
        const header = {
            headers: new HttpHeaders()
                .set('X-Auth-Token', `${this.apiToken}`)
        };
        return this.http.get(url, header).pipe(
            map((result: any) => {
                // delete unnecessary data
                for (const match of result.matches) {
                    for (const key in match) {
                        if (key !== 'id' && key !== 'score' && key !== 'homeTeam' && key !== 'awayTeam' && key !== 'utcDate') {
                            delete (match[key]);
                        }
                    }
                }
                return result;
            })
        );
    }



}

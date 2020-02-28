import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FootballDataService {


    constructor(
        @Inject('API_TOKEN') private apiToken: string,
        private http: HttpClient
    ) { }

    getTeams()  {
        const url = 'https://api.football-data.org/v2/competitions/2001/teams';
        const header = {
            headers: new HttpHeaders()
                .set('X-Auth-Token', `${this.apiToken}`)
        };
        return this.http.get(url, header);
    }



}

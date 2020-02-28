import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FootballDataService } from './football-data.service';
import { environment } from '@environments/environment';


describe('Test for Zonas service', () => {
    let service: FootballDataService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: 'API_TOKEN', useValue: environment.token },
                { provide: FootballDataService, useClass: FootballDataService },
            ]
        });
        service = TestBed.get(FootballDataService);
        httpTestingController = TestBed.get(HttpTestingController as Type<HttpTestingController>);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    describe('Test for getTeams', () => {

        it('should return the expect data', () => {

            const path = 'https://api.football-data.org/v2/competitions/2001/teams';
            const expectedPath = 'https://api.football-data.org/v2/competitions/2001/teams';
            const data = [{
                id: 1,
                shortName: 'Juventus',
                name: 'Juventus FC',
            }];

            service.getTeams().subscribe(response => {
                expect(response).toEqual(data);
            });

            const req = httpTestingController.expectOne(expectedPath);

            expect(req.request.method).toEqual('GET');
            expect(req.request.body).toBeDefined();
            // Respond with the mock data
            req.flush(data);
        });
    });

});

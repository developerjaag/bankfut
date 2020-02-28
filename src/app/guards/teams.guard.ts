import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of, forkJoin } from 'rxjs';
import { tap, take, switchMap, catchError } from 'rxjs/operators';


import { TeamsState } from '@store/states/teams.state';
import { getCountAllTeams } from '@store/selectors/teams.selectors';
import { requestAddTeams } from '@store/actions/teams/teams.actions';


@Injectable()
export class TeamsGuard implements CanActivate {

    constructor(
        private store: Store<TeamsState>
    ) { }

    canActivate(): Observable<boolean> {
        return forkJoin([
            this.checkTeams(),
        ]).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    private checkTeams() {
        return this.store.pipe(
            select(getCountAllTeams),
            tap(total => {
                if (total === 0) {
                    this.dispatchLoadTeams();
                }
            }),
            take(1)
        );
    }

    private dispatchLoadTeams() {
        const action = requestAddTeams();
        this.store.dispatch(action);
    }


}

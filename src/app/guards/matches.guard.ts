import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of, forkJoin } from 'rxjs';
import { tap, take, switchMap, catchError } from 'rxjs/operators';


import { MatchesState } from '@store/states/matches.state';
import { getCountAllMatches } from '@store/selectors/matches.selectors';
import { requestAddMatches } from '@store/actions/matches/matches.actions';


@Injectable()
export class MatchesGuard implements CanActivate {

    constructor(
        private store: Store<MatchesState>
    ) { }

    canActivate(): Observable<boolean> {
        return forkJoin([
            this.checkMatches(),
        ]).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    private checkMatches() {
        return this.store.pipe(
            select(getCountAllMatches),
            tap(total => {
                if (total === 0) {
                    this.dispatchLoadMatches();
                }
            }),
            take(1)
        );
    }

    private dispatchLoadMatches() {
        const action = requestAddMatches();
        this.store.dispatch(action);
    }


}

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of, forkJoin, combineLatest } from 'rxjs';
import { tap, take, switchMap, catchError } from 'rxjs/operators';

import { GoalState } from '@store/states/goals.state';

import { getProfile } from '@store/selectors/auth.selectors';
import { getCountAllGoals } from '@store/selectors/goals.selectors';

import { requestAddGoals } from '@store/actions/goals/goals.actions';

import { activeLoading } from '@store/actions/ui/ui.actions';


@Injectable()
export class GoalsGuard implements CanActivate {

    constructor(
        private store: Store<GoalState>
    ) { }

    canActivate(): Observable<boolean> {
        return forkJoin([
            this.checkGoals(),
        ]).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    private checkGoals() {
        // tslint:disable-next-line: deprecation
        return combineLatest(
            this.store.pipe(select(getCountAllGoals)),
            this.store.pipe(select(getProfile))
        ).pipe(
            tap(data => {
                if (data[0] === 0) {
                    this.dispatchLoadGoals(data[1].uid);
                    this.dispatchLoading();
                }
            }),
            take(1)
        );

    }

    private dispatchLoadGoals(uidUser: string) {
        const action = requestAddGoals({ uidUser });
        this.store.dispatch(action);
    }

    private dispatchLoading() {
        const action = activeLoading();
        this.store.dispatch(action);
    }

}

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of, forkJoin, combineLatest } from 'rxjs';
import { tap, take, switchMap, catchError } from 'rxjs/operators';

import { RuleState } from '@store/states/rules.state';

import { getProfile } from '@store/selectors/auth.selectors';
import { getCountAllRules } from '@store/selectors/rules.selectors';

import { requestAddRules } from '@store/actions/rules/rules.actions';

import { activeLoading } from '@store/actions/ui/ui.actions';


@Injectable()
export class RulesGuard implements CanActivate {

    constructor(
        private store: Store<RuleState>
    ) { }

    canActivate(): Observable<boolean> {
        return forkJoin([
            this.checkRules(),
        ]).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    private checkRules() {
        // tslint:disable-next-line: deprecation
        return combineLatest(
            this.store.pipe(select(getCountAllRules)),
            this.store.pipe(select(getProfile))
        ).pipe(
            tap(data => {
                if (data[0] === 0) {
                    this.dispatchLoadRules(data[1].uid);
                    this.dispatchLoading();
                }
            }),
            take(1)
        );

    }

    private dispatchLoadRules(uidUser: string) {
        const action = requestAddRules({ uidUser });
        this.store.dispatch(action);
    }

    private dispatchLoading() {
        const action = activeLoading();
        this.store.dispatch(action);
    }

}

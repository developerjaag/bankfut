import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { merge } from 'rxjs';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';

import {
    addRules,
    addOneRule,
    editOneRule,
    requestAddRules,
    requestAddOneRule,
    requestEditOneRule
} from '@store/actions/rules/rules.actions';

import { stopLoading, addMessageToast, clearMessageToast } from '@store/actions/ui/ui.actions';

import { RuleService } from '@services/rules.service';

@Injectable()
export class RuleEffects {

    requestAddRules$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestAddRules),
            switchMap(({ uidUser }) =>
                this.ruleService.getRules(uidUser).pipe(
                    mergeMap((rules) => [
                        addRules({ rules }),
                        stopLoading()
                    ]),
                    catchError((err) => merge([
                        addMessageToast({ message: 'Ups!, algo salio mal obteniendo tus reglas', status: 'danger' }),
                        clearMessageToast(),
                        stopLoading()
                    ])
                    )
                )
            )
        )
    );


    requestAddOneRule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestAddOneRule),
            switchMap(({ rule }) =>
                this.ruleService.addRule(rule).pipe(
                    mergeMap(() => [
                        addOneRule({
                            rule
                        }),
                        addMessageToast({ message: 'Regla adicionada!', status: 'success' }),
                        stopLoading()
                    ]),
                    catchError(() => merge([
                        addMessageToast({ message: 'Ups!, algo salio adicionando tu regla', status: 'danger' }),
                        clearMessageToast(),
                        stopLoading()
                    ])
                    )
                )
            )
        )
    );


    requestEditOneRule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestEditOneRule),
            switchMap(({ rule }) =>
                this.ruleService.updateRule(rule).pipe(
                    mergeMap(() => [
                        editOneRule({
                            rule: {
                                id: rule.uid,
                                changes: {
                                    ...rule
                                }
                            }
                        }),
                        addMessageToast({ message: 'Regla modificada!', status: 'success' }),
                        stopLoading()
                    ]),
                    catchError(() => merge([
                        addMessageToast({ message: 'Ups!, algo salio modificando tu regla', status: 'danger' }),
                        clearMessageToast(),
                        stopLoading()
                    ])
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private ruleService: RuleService
    ) { }

}

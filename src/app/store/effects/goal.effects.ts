import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { merge } from 'rxjs';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';

import {
    addGoals,
    addOneGoal,
    editOneGoal,
    requestAddGoals,
    requestAddOneGoal,
    requestEditOneGoal
} from '@store/actions/goals/goals.actions';
import { stopLoading, addMessageToast, clearMessageToast } from '@store/actions/ui/ui.actions';

import { GoalService } from '@services/goals.service';

@Injectable()
export class GoalEffects {

    requestAddGoals$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestAddGoals),
            switchMap(({ uidUser }) =>
                this.goalService.getGoals(uidUser).pipe(
                    mergeMap((goals) => [
                        addGoals({ goals }),
                        stopLoading()
                    ]),
                    catchError((err) => merge([
                        addMessageToast({ message: 'Ups!, algo salio mal listando tus metas', status: 'danger' }),
                        clearMessageToast(),
                        stopLoading()
                    ])
                    )
                )
            )
        )
    );


    requestAddOneGoal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestAddOneGoal),
            switchMap(({ goal }) =>
                this.goalService.addGoal(goal).pipe(
                    mergeMap(() => [
                        addOneGoal({
                            goal
                        }),
                        addMessageToast({ message: 'Meta adicionada!', status: 'success' }),
                        stopLoading()
                    ]),
                    catchError(() => merge([
                        addMessageToast({ message: 'Ups!, algo salio adicionando tu meta', status: 'danger' }),
                        clearMessageToast(),
                        stopLoading()
                    ])
                    )
                )
            )
        )
    );


    requestEditOneGoal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestEditOneGoal),
            switchMap(({ goal }) =>
                this.goalService.updateGoal(goal).pipe(
                    mergeMap(() => [
                        editOneGoal({
                            goal: {
                                id: goal.uid,
                                changes: {
                                    ...goal
                                }
                            }
                        }),
                        addMessageToast({ message: 'Meta modificada!', status: 'success' }),
                        stopLoading()
                    ]),
                    catchError(() => merge([
                        addMessageToast({ message: 'Ups!, algo salio modificando tu meta', status: 'danger' }),
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
        private goalService: GoalService
    ) { }

}

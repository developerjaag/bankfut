import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { merge } from 'rxjs';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';

import { addMatches, requestAddMatches } from '@store/actions/matches/matches.actions';
import { stopLoading, addMessageToast, clearMessageToast } from '@store/actions/ui/ui.actions';

import { FootballDataService } from '@services/football-data.service';

@Injectable()
export class MatchesEffects {

    requestAddMatches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestAddMatches),
            switchMap(() =>
                this.footballDataService.getMatches().pipe(
                    mergeMap((result: any) => [
                        addMatches({ matches: result.matches }),
                        stopLoading()
                    ]),
                    catchError(() => merge([
                        addMessageToast({ message: 'Ups!, algo salio mal obteniendo partidos', status: 'danger' }),
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
        private footballDataService: FootballDataService
    ) { }

}

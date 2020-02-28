import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { merge } from 'rxjs';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';


import { addTeams, requestAddTeams } from '@store/actions/teams/teams.actions';
import { stopLoading, addMessageToast, clearMessageToast } from '@store/actions/ui/ui.actions';

import { FootballDataService } from '@services/football-data.service';

@Injectable()
export class TeamsEffects {

    requestAddTeams$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestAddTeams),
            switchMap(() =>
                this.footballDataService.getTeams().pipe(
                    mergeMap((result: any) => [
                        addTeams({ teams: result.teams }),
                        stopLoading()
                    ]),
                    catchError(() => merge([
                        addMessageToast({ message: 'Ups!, algo salio mal obteniendo equipos', status: 'danger' }),
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

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { merge } from 'rxjs';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';

import {
    authRequestLoginGoogle,
    setPersistence,
    authLogOut,
    authRequestAddProfile,
    authSetProfile
} from '@store/actions/auth/auth.actions';
import { stopLoading, addMessageToast, clearMessageToast } from '@store/actions/ui/ui.actions';


import { AuthService } from '@services/auth.service';

@Injectable()
export class AuthEffects {

    authRequestLoginGoogle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authRequestLoginGoogle),
            switchMap(() =>
                this.authService.loginGoogle().pipe(
                    mergeMap((data) => [
                        setPersistence(),
                        authRequestAddProfile({
                            profile: {
                                email: data.user.email,
                                name: data.user.displayName,
                                uid: data.user.uid,
                                avatar: data.user.photoURL
                            }
                        }),
                    ]),
                    catchError(() => merge([
                        addMessageToast({ message: 'Ups! algo salío mal ingresando con Google', status: 'danger' }),
                        clearMessageToast(),
                        stopLoading()
                    ])
                    )
                )
            )
        )
    );

    setPersistence$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setPersistence),
            switchMap(() =>
                this.authService.setPersistence().pipe(
                    mergeMap(() => [])
                )
            )
        )
    );

    requestAddProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authRequestAddProfile),
            switchMap(({ profile }) =>
                this.authService.createDocumentUser(profile).pipe(
                    mergeMap(() => [
                        stopLoading(),
                        authSetProfile({ profile })
                    ]),
                    catchError(() => merge([
                        addMessageToast({ message: 'Ups! algo salío mal registrándote', status: 'danger' }),
                        clearMessageToast(),
                        stopLoading()
                    ])
                    )
                )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authLogOut),
            switchMap(() =>
                this.authService.logout().pipe(
                    mergeMap(() => [])
                )
            )
        )

    );

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) { }

}

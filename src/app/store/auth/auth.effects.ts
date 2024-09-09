import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap(action =>
                this.authService.login(action.email, action.password).pipe(
                    map(response => {
                        if (response && response.access_token && response.email) {
                            return AuthActions.loginSuccess({ token: response.access_token, email: response.email });
                        }
                        return AuthActions.loginFailure({ error: 'Invalid response from server' });
                    }),
                    catchError(error => of(AuthActions.loginFailure({ error: error?.error?.message || error.message || 'An error occurred' })))
                )
            )
        )
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.register),
            switchMap(action =>
                this.authService.register(action.email, action.password).pipe(
                    map(response => {
                        if (response && response.access_token && response.email) {
                            return AuthActions.registerSuccess({ token: response.access_token, email: response.email });
                        }
                        return AuthActions.registerFailure({ error: 'Invalid response from server' });
                    }),
                    catchError(error => of(AuthActions.registerFailure({ error: error?.error?.message || error?.error?.message || 'An error occurred' })))
                )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            switchMap(() =>
                this.authService.logout().pipe(
                    map(() => AuthActions.logoutSuccess()),
                    catchError(error => of(AuthActions.logoutFailure({ error: error?.error?.message || error.message || 'An error occurred' })))
                )
            )
        )
    );

    constructor(private authService: AuthService) { }
}
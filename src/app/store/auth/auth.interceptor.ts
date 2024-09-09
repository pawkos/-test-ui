import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { first, mergeMap } from 'rxjs/operators';

export function AuthInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const store: Store<{ auth: AuthState }> = inject(Store);

    return store.select(state => state.auth.token).pipe(
        first(),
        mergeMap(token => {
            if (token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            return next(request);
        })
    );
}
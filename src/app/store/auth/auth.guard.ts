import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthState } from './auth.reducer';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<{ auth: AuthState }>, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.store.select(state => state.auth.token).pipe(
            take(1),
            map(token => {
                if (token) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }
}
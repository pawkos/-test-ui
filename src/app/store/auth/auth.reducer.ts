import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    email: string | null;
    error: string | null;
    isLoading: boolean;
}

export const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
    email: null,
    error: null,
    isLoading: false,
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, AuthActions.register, (state) => ({ ...state, isLoading: true, error: null })),
    on(AuthActions.loginSuccess, AuthActions.registerSuccess, (state, { token, email }) => ({
        ...state,
        isLoggedIn: true,
        token,
        email,
        isLoading: false,
        error: null,
    })),
    on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
    })),
    on(AuthActions.logout, (state) => ({ ...state, isLoading: true })),
    on(AuthActions.logoutSuccess, () => initialState),
    on(AuthActions.logoutFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
    }))
);
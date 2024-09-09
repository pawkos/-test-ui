import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
    selectAuthState,
    (state: AuthState) => state.isLoggedIn
);

export const selectAuthToken = createSelector(
    selectAuthState,
    (state: AuthState) => state.token
);

export const selectAuthError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
);

export const selectIsLoading = createSelector(
    selectAuthState,
    (state: AuthState) => state.isLoading
);

export const selectUserEmail = createSelector(
    selectAuthState,
    (state: AuthState) => state.email
);
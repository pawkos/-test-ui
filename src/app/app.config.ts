import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { todoReducer } from './store/todo/todo.reducer';
import { TodoEffects } from './store/todo/todo.effects';
import { AuthInterceptor } from './store/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideStore(),
        provideState({ name: 'auth', reducer: authReducer }),
        provideState({ name: 'todos', reducer: todoReducer }),
        provideEffects([AuthEffects, TodoEffects]),
        provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
        provideAnimations(),
        provideClientHydration(),
    ]
};
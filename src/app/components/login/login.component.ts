import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';
import { selectAuthError, selectIsLoading } from '../../store/auth/auth.selectors';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        AsyncPipe
    ],
    template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="max-w-md mx-auto mt-8">
      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email" required>
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Password</mat-label>
        <input matInput formControlName="password" type="password" required>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid || (isLoading$ | async)">
        {{ (isLoading$ | async) ? 'Logging in...' : 'Login' }}
      </button>

      <mat-spinner *ngIf="isLoading$ | async" diameter="24" class="ml-2"></mat-spinner>

      <p *ngIf="error$ | async as error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  `
})
export class LoginComponent {
    loginForm;
    isLoading$;
    error$;

    constructor(
        private fb: FormBuilder,
        private store: Store
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.isLoading$ = this.store.select(selectIsLoading);
        this.error$ = this.store.select(selectAuthError);
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const email = this.loginForm.get('email')?.value as string;
            const password = this.loginForm.get('password')?.value as string;
            this.store.dispatch(login({ email, password }));
        }
    }
}
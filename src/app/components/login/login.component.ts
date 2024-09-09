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
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

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
    MatCardModule,
    MatIconModule,
    RouterModule,
    AsyncPipe
  ],
  template: `
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <mat-card class="w-full max-w-md p-8 space-y-4">
      <h1 class="text-xl font-semibold text-center">Login</h1>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <mat-form-field class="w-full">
          <mat-label>Email</mat-label>
          <input matInput placeholder="Enter your email" formControlName="email">
          <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email is required</mat-error>
          <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Enter a valid email</mat-error>
        </mat-form-field>

        <mat-form-field class="w-full">
          <mat-label>Password</mat-label>
          <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" placeholder="Enter your password">
          <button mat-icon-button matSuffix type="button" (click)="togglePasswordVisibility()" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hidePassword">
            <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
          <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Password is required</mat-error>
        </mat-form-field>

        <!--<div class="flex justify-between items-center">
          <mat-checkbox formControlName="rememberMe">Remember me</mat-checkbox>
        </div>-->

        <p class="text-sm text-gray-500 text-center mt-4">
          Don't have an account? 
          <a routerLink="/register" class="text-blue-500 hover:underline">Sign up</a>
        </p>

        <button mat-raised-button color="primary" class="w-full mt-4" type="submit" [disabled]="loginForm.invalid || (isLoading$ | async)">
          {{ (isLoading$ | async) ? 'Logging in...' : 'Login' }}
          <mat-progress-spinner *ngIf="isLoading$ | async" diameter="20" mode="indeterminate"></mat-progress-spinner>
        </button>
        <p *ngIf="error$ | async as error" class="text-red-500 mt-2">{{ error }}</p>
      </form>
    </mat-card>
  </div>
  `,
  styles: `
    .mat-mdc-progress-spinner { display: inline-block; }
  `
})
export class LoginComponent {
  loginForm;
  isLoading$;
  error$;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      //rememberMe: [false]
    });

    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      //const email = this.loginForm.get('email')?.value as string;
      //const password = this.loginForm.get('password')?.value as string;
      //this.store.dispatch(login({ email, password }));
      const { email, password } = this.loginForm.value;
      this.store.dispatch(login({ email: email!, password: password! }));
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
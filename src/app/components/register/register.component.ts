import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../store/auth/auth.actions';
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
  selector: 'app-register',
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
    <div class="flex justify-center items-center h-screen bg-gray-50">
      <mat-card class="w-full max-w-md p-8 shadow-lg">
        <h1 class="text-2xl font-bold text-center text-gray-700 mb-6">Create Your Account</h1>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <mat-form-field class="w-full">
            <mat-label>Email</mat-label>
            <input matInput placeholder="Enter your email" formControlName="email" class="bg-gray-100">
            <mat-error *ngIf="registerForm.get('email')?.hasError('required')">Email is required</mat-error>
            <mat-error *ngIf="registerForm.get('email')?.hasError('email')">Enter a valid email</mat-error>
          </mat-form-field>

          <mat-form-field class="w-full">
            <mat-label>Password</mat-label>
            <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" placeholder="Enter your password" class="bg-gray-100">
            <button mat-icon-button matSuffix type="button" (click)="togglePasswordVisibility()" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hidePassword">
              <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            <mat-error *ngIf="registerForm.get('password')?.hasError('required')">Password is required</mat-error>
          </mat-form-field>

          <mat-form-field class="w-full">
            <mat-label>Confirm Password</mat-label>
            <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="confirmPassword" placeholder="Confirm your password" class="bg-gray-100">
            <button mat-icon-button matSuffix type="button" (click)="togglePasswordVisibility()" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hidePassword">
              <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('required')">Confirm password is required</mat-error>
            <mat-error *ngIf="registerForm.hasError('passwordMismatch')">Passwords do not match</mat-error>
          </mat-form-field>

          <p class="text-sm text-gray-500 text-center mt-4">
            Already have an account? 
            <a routerLink="/login" class="text-blue-500 hover:underline">Login here</a>
          </p>

          <button mat-raised-button color="primary" class="w-full mt-6 py-2 text-white" type="submit" [disabled]="registerForm.invalid || (isLoading$ | async)">
            {{ (isLoading$ | async) ? 'Registering...' : 'Register' }}
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
export class RegisterComponent {
  registerForm;
  isLoading$;
  error$;
  hidePassword = true;

  constructor(private fb: FormBuilder, private store: Store) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const { password, confirmPassword } = formGroup.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      //const email = this.registerForm.get('email')?.value as string;
      //const password = this.registerForm.get('password')?.value as string;
      //this.store.dispatch(register({ email, password }));
      const { email, password } = this.registerForm.value;
      this.store.dispatch(register({ email: email!, password: password! }));
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
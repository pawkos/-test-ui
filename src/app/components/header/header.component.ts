import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn, selectUserEmail } from '../../store/auth/auth.selectors';
import { logout } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatToolbarModule, MatButtonModule, AsyncPipe],
  template: `
    <mat-toolbar color="primary">
      <span>TODO UI</span>
      <span class="flex-grow"></span>
      <a mat-button routerLink="/">Home</a>
      <ng-container *ngIf="(isLoggedIn$ | async) === false; else loggedIn">
        <a mat-button routerLink="/login">Login</a>
        <a mat-button routerLink="/register">Register</a>
      </ng-container>
      <ng-template #loggedIn>
        <span>{{ userEmail$ | async }}</span>
        <button mat-button (click)="onLogout()">Logout</button>
      </ng-template>
    </mat-toolbar>
  `,
  styles: [`
    .flex-grow { flex-grow: 1; }
    span { margin-right: 10px; }
  `]
})
export class HeaderComponent {
  isLoggedIn$;
  userEmail$;

  constructor(private store: Store) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.userEmail$ = this.store.select(selectUserEmail);
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
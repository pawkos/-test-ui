import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { selectIsLoggedIn } from '../../store/auth/auth.selectors';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [AsyncPipe, MatCardModule],
    template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Welcome to My App</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>You are currently {{ (isLoggedIn$ | async) ? 'logged in' : 'not logged in' }}.</p>
      </mat-card-content>
    </mat-card>
  `,
    styles: [`
    mat-card { max-width: 400px; margin: 2em auto; text-align: center; }
  `]
})
export class LandingPageComponent {
    isLoggedIn$;

    constructor(private store: Store) {
        this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    }
}
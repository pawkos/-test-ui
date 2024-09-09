import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '../../store/todo/todo.model';
import * as TodoActions from '../../store/todo/todo.actions';
import * as fromTodo from '../../store/todo/todo.reducer';
import { MatCardModule } from '@angular/material/card';
import { selectIsLoggedIn } from '../../store/auth/auth.selectors';

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
    ],
    template: `
    <mat-card class="max-w-lg mx-auto my-8 text-center">
      <mat-card-header>
        <mat-card-title class="text-xl font-semibold">Welcome to TODO UI. You are {{ (isLoggedIn$ | async) ? 'logged in' : 'not logged in' }}.</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div *ngIf="loading$ | async" class="flex justify-center items-center">
            <mat-spinner></mat-spinner>
        </div>
        <div *ngIf="error$ | async as error" class="text-red-500 mb-4">
            {{ error }}
        </div>
        <mat-list>
            <mat-list-item *ngFor="let todo of todos$ | async">
                <div class="flex">
                    <div class="flex-none">
                        <button mat-icon-button (click)="toggleTodo(todo)" [disabled]="!(isLoggedIn$ | async)" class="flex-none">
                            <mat-icon>{{ todo.isCompleted ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>
                        </button>
                    </div>
                    <div [class.line-through]="todo.isCompleted" class="grow text-left content-center">{{ todo.title }}</div>
                    <div class="flex-none">
                        <button mat-icon-button (click)="deleteTodo(todo.id)" [disabled]="!(isLoggedIn$ | async)">
                            <mat-icon>delete</mat-icon>
                        </button>
                    </div>
                </div>
            </mat-list-item>
        </mat-list>
        <form (ngSubmit)="addTodo()" class="mb-4 flex">
            <mat-form-field class="w-full">
                <input matInput [(ngModel)]="newTodoTitle" name="newTodoTitle" required placeholder="Add a new TODO" [disabled]="!(isLoggedIn$ | async)">
            </mat-form-field>
        </form>
      </mat-card-content>
    </mat-card>
  `
})
export class TodoListComponent implements OnInit {
    isLoggedIn$;
    todos$: Observable<Todo[]>;
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    newTodoTitle = '';

    constructor(private store: Store<fromTodo.State>) {
        this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
        this.todos$ = this.store.select(fromTodo.selectAllTodos);
        this.loading$ = this.store.select(fromTodo.selectLoading);
        this.error$ = this.store.select(fromTodo.selectError);
    }

    ngOnInit() {
        this.store.dispatch(TodoActions.loadTodos());
    }

    addTodo() {
        if (this.newTodoTitle.trim()) {
            this.store.dispatch(TodoActions.addTodo({ title: this.newTodoTitle }));
            this.newTodoTitle = '';
        }
    }

    toggleTodo(todo: Todo) {
        this.store.dispatch(TodoActions.updateTodo({ id: todo.id, changes: { isCompleted: !todo.isCompleted } }));
    }

    deleteTodo(id: string) {
        this.store.dispatch(TodoActions.deleteTodo({ id }));
    }
}
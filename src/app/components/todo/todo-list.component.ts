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
    ],
    template: `
    <div *ngIf="loading$ | async" class="flex justify-center items-center">
      <mat-spinner></mat-spinner>
    </div>
    <div *ngIf="error$ | async as error" class="text-red-500 mb-4">
      {{ error }}
    </div>
    <form (ngSubmit)="addTodo()" class="mb-4">
      <mat-form-field class="w-full">
        <input matInput [(ngModel)]="newTodoTitle" name="newTodoTitle" placeholder="Add a new TODO">
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" class="ml-2">Add</button>
    </form>
    <mat-list>
      <mat-list-item *ngFor="let todo of todos$ | async">
        <span [class.line-through]="todo.completed">{{ todo.title }}</span>
        <button mat-icon-button (click)="toggleTodo(todo)">
          <mat-icon>{{ todo.completed ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>
        </button>
        <button mat-icon-button (click)="deleteTodo(todo.id)">
          <mat-icon>delete</mat-icon>
        </button>
      </mat-list-item>
    </mat-list>
  `,
})
export class TodoListComponent implements OnInit {
    todos$: Observable<Todo[]>;
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    newTodoTitle = '';

    constructor(private store: Store<fromTodo.State>) {
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
        this.store.dispatch(TodoActions.updateTodo({ id: todo.id, changes: { completed: !todo.completed } }));
    }

    deleteTodo(id: string) {
        this.store.dispatch(TodoActions.deleteTodo({ id }));
    }
}
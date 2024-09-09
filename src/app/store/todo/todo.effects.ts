import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';
import * as TodoActions from './todo.actions';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map(todos => TodoActions.loadTodosSuccess({ todos })),
          catchError(error => of(TodoActions.loadTodosFailure({ error: error?.error?.message || error.message || 'An error occurred' })))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      switchMap(({ title }) =>
        this.todoService.addTodo(title).pipe(
          map(todo => TodoActions.addTodoSuccess({ todo })),
          catchError(error => of(TodoActions.addTodoFailure({ error: error?.error?.message || error.message || 'An error occurred' })))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      switchMap(({ id, changes }) =>
        this.todoService.updateTodo(id, changes).pipe(
          map(todo => TodoActions.updateTodoSuccess({ todo: todo[1][0] })),
          catchError(error => of(TodoActions.updateTodoFailure({ error: error?.error?.message || error.message || 'An error occurred' })))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      switchMap(({ id }) =>
        this.todoService.deleteTodo(id).pipe(
          map(() => TodoActions.deleteTodoSuccess({ id })),
          catchError(error => of(TodoActions.deleteTodoFailure({ error: error?.error?.message || error.message || 'An error occurred' })))
        )
      )
    )
  );

  constructor(private todoService: TodoService) { }
}
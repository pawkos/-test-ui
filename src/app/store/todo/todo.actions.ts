import { createAction, props } from '@ngrx/store';
import { Todo } from './todo.model';

export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction('[Todo] Load Todos Success', props<{ todos: Todo[] }>());
export const loadTodosFailure = createAction('[Todo] Load Todos Failure', props<{ error: string }>());

export const addTodo = createAction('[Todo] Add Todo', props<{ title: string }>());
export const addTodoSuccess = createAction('[Todo] Add Todo Success', props<{ todo: Todo }>());
export const addTodoFailure = createAction('[Todo] Add Todo Failure', props<{ error: string }>());

export const updateTodo = createAction('[Todo] Update Todo', props<{ id: string, changes: Partial<Todo> }>());
export const updateTodoSuccess = createAction('[Todo] Update Todo Success', props<{ todo: Todo }>());
export const updateTodoFailure = createAction('[Todo] Update Todo Failure', props<{ error: string }>());

export const deleteTodo = createAction('[Todo] Delete Todo', props<{ id: string }>());
export const deleteTodoSuccess = createAction('[Todo] Delete Todo Success', props<{ id: string }>());
export const deleteTodoFailure = createAction('[Todo] Delete Todo Failure', props<{ error: string }>());
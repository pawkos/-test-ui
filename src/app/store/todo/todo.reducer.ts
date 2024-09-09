import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from './todo.model';
import * as TodoActions from './todo.actions';

export interface State extends EntityState<Todo> {
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
});

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state) => ({ ...state, loading: true })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => adapter.setAll(todos, { ...state, loading: false })),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(TodoActions.addTodoSuccess, (state, { todo }) => adapter.addOne(todo, state)),
  on(TodoActions.updateTodoSuccess, (state, { todo }) => adapter.updateOne({ id: todo.id, changes: todo }, state)),
  on(TodoActions.deleteTodoSuccess, (state, { id }) => adapter.removeOne(id, state)),
  on(TodoActions.addTodoFailure, TodoActions.updateTodoFailure, TodoActions.deleteTodoFailure, (state, { error }) => ({ ...state, error }))
);

export const selectTodoState = createFeatureSelector<State>('todos');

export const {
  selectAll: selectAllTodos,
  selectEntities: selectTodoEntities,
  selectIds: selectTodoIds,
  selectTotal: selectTodoTotal,
} = adapter.getSelectors(selectTodoState);

export const selectLoading = createSelector(selectTodoState, (state) => state.loading);
export const selectError = createSelector(selectTodoState, (state) => state.error);
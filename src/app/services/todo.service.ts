import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Todo } from '../store/todo/todo.model';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.apiUrl}/todos`)
            .pipe(
                catchError(this.handleError)
            );
    }

    addTodo(title: string): Observable<Todo> {
        return this.http.post<Todo>(`${this.apiUrl}/todos/login`, { title, completed: false })
            .pipe(
                catchError(this.handleError)
            );
    }

    updateTodo(id: string, changes: Partial<Todo>): Observable<Todo> {
        return this.http.patch<Todo>(`${this.apiUrl}/todos/${id}`, changes)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteTodo(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/todos/${id}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: any): Observable<never> {
        console.error('An error occurred:', error);
        throw error;
    }
}
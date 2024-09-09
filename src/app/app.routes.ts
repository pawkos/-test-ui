import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo/todo-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', component: TodoListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
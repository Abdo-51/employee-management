import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login' , loadComponent: () => import('./Pages/auth/login/login.component').then(m => m.LoginComponent)},
    {path: 'signup' , loadComponent: () => import('./Pages/auth/signup/signup.component').then(m => m.SignupComponent)},
    {path: 'dashboard' , loadComponent: () => import('./Pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard],
        children: [
            {path: '', redirectTo: 'employees', pathMatch: 'full'},
            {path: 'employees' , loadComponent: () => import('./Pages/employees/employee-list/employee-list.component').then(m => m.EmployeeListComponent)},
            {path: 'employees/new' , loadComponent: () => import('./Pages/employees/employee-form/employee-form.component').then(m => m. EmployeeFormComponent)},
            {path: 'employees/:id/edit' , loadComponent: () => import('./Pages/employees/employee-form/employee-form.component').then(m => m.EmployeeFormComponent )},
        ]
    },
];

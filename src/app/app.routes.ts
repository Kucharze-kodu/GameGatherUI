import { Routes } from '@angular/router';
import { LoginPageComponent } from './authentication/ui/login-page/login-page.component';
import { RegisterPageComponent } from './authentication/ui/register-page/register-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: 'register',
        component: RegisterPageComponent,
    }
];

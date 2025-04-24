import { Routes } from '@angular/router';
import { LoginPageComponent } from './authentication/ui/login-page/login-page.component';
import { RegisterPageComponent } from './authentication/ui/register-page/register-page.component';
import { VerifyEmailPageComponent } from './authentication/ui/verify-email-page/verify-email-page.component';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';

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
    },
    {
        path: 'verify-email',
        component: VerifyEmailPageComponent
    },
    {
        path: 'home',
        component: HomePageComponent,
        canActivate: [AuthenticationGuard]
    }
];

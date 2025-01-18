import {Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        redirectTo: '/',
        loadComponent: () =>
          import('./login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./register/register.component').then(m => m.RegisterComponent),
      },
      {
        path: 'customize',
        loadComponent: () =>
          import('./customize/customize.component').then(m => m.CustomizeComponent),
      }
    ]
  }
]

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
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./register/register.component').then(m => m.RegisterComponent),
      },
    ]
  }
]

import {Routes} from "@angular/router";
import {GestionaleComponent} from './gestionale/gestionale.component';
import {authGuard} from '../auth/auth.guard';

export const GESTIONALE_ROUTES: Routes = [
  {
    path: '',
    component: GestionaleComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'inventory',
        loadComponent: () =>
          import('./inventory/inventory.component').then(m => m.InventoryComponent),
      }
    ]
  }
]

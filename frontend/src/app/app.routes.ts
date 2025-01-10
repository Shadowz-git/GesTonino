import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {FeaturesComponent} from './features/features.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contacts',
    component: ContactComponent,
  },
  {
    path: 'services',
    component: FeaturesComponent
  },
  {
    path: 'gestionale',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('./gestionale/gestionale.routes').then(m => m.GESTIONALE_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

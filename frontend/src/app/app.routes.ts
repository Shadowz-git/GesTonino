import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {FeaturesComponent} from './features/features.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '/',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: '/home',
    component: HomeComponent,
  },
  {
    path: '/about',
    component: AboutComponent,
  },
  {
    path: '/contact',
    component: ContactComponent,
  },
  {
    path: 'services',
    component: FeaturesComponent
  },
  {
    path: 'gestionale',
    pathMatch: 'prefix',
    children: [
      {
        path: 'dashboard'
      },
      {
        path: 'items'
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path : 'login',
      },
      {
        path : 'register',
      },
      {
        path: 'customize',
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

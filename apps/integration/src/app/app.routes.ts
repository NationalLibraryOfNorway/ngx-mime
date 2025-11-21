import { Routes } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';

export const appRoutes: Routes = [
  {
    path: 'viewer',
    children: [
      {
        path: ':id',
        component: ViewerComponent,
      },
      {
        path: '',
        redirectTo: 'components',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'viewer',
    pathMatch: 'full',
  },
];

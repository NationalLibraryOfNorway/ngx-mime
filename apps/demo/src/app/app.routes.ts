import { Routes } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  { path: 'demo', component: ViewerComponent },
];

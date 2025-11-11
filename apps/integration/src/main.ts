import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { provideHttpClient } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ViewerComponent } from './app/viewer/viewer.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const appRoutes: Routes = [
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

bootstrapApplication(AppComponent, {
  providers: [
    provideNoopAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes),
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ],
}).catch((err) => console.log(err));

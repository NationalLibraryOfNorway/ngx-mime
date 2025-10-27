import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { provideHttpClient } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {
  bootstrapApplication,
  BrowserModule,
  HammerModule,
} from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';
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

await bootstrapApplication(AppComponent, {
  providers: [
    provideNoopAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes),
    BrowserModule,
    HammerModule,
    MatMenuModule,
    MatButtonModule,
    MimeModule,
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ],
}).catch((err) => console.log(err));

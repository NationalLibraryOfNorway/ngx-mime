import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  Routes,
  withPreloading,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/core/auth.interceptor';
import { ViewerComponent } from './app/viewer/viewer.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const appRoutes: Routes = [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  { path: 'demo', component: ViewerComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ],
}).catch((err) => console.log(err));

import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, Provider } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { AuthInterceptor } from './core/auth.interceptor';

const providers: Provider = [
  provideHttpClient(),
  provideRouter(appRoutes, withPreloading(PreloadAllModules)),
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
];

export const appConfig: ApplicationConfig = {
  providers,
};

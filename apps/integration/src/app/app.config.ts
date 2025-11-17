import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

const providers: Provider = [
  provideHttpClient(),
  provideRouter(appRoutes),
  { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
];

export const appConfig: ApplicationConfig = {
  providers,
};

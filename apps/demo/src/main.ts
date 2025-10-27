import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  bootstrapApplication,
  BrowserModule,
  HammerModule,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  Routes,
  withPreloading,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/core/auth.interceptor';
import { ManifestService } from './app/core/manifest-service/manifest.service';
import { StyleManagerService } from './app/core/navbar/theme-picker/style-manager/style-manager.service';
import { ThemeService } from './app/core/navbar/theme-picker/theme-service/theme.service';
import { ViewerComponent } from './app/viewer/viewer.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const appRoutes: Routes = [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  { path: 'demo', component: ViewerComponent },
];

await bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    BrowserModule,
    HammerModule,
    MatSidenavModule,
    ManifestService,
    ThemeService,
    StyleManagerService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ],
}).catch((err) => console.log(err));

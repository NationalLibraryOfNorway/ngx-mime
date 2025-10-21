import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  bootstrapApplication,
  BrowserModule,
  HammerModule,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { CoreModule } from './app/core/core.module';
import { SharedModule } from './app/shared/shared.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      HammerModule,
      HttpClientModule,
      AppRoutingModule,
      CoreModule,
      SharedModule,
      MatSidenavModule,
    ),
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    provideAnimations(),
  ],
}).catch((err) => console.log(err));

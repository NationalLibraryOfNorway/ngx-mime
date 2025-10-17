import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import {
  bootstrapApplication,
  BrowserModule,
  HammerModule,
} from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';
import { AppComponent } from './app/app.component';

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
      MatMenuModule,
      MatButtonModule,
      MimeModule,
    ),
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    provideNoopAnimations(),
  ],
}).catch((err) => console.log(err));

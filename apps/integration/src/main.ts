import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {
  bootstrapApplication,
  BrowserModule,
  HammerModule,
} from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
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
      MatMenuModule,
      MatButtonModule,
      MimeModule,
    ),
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    provideNoopAnimations(),
  ],
}).catch((err) => console.log(err));

import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { provideHttpClient } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule, createApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

(async () => {
  const name = 'app-mime-viewer';
  const applicationRef = await createApplication({
    providers: [
      BrowserModule,
      provideAnimations(),
      provideHttpClient(),
      importProvidersFrom(MimeModule),
      { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    ],
  });
  if (!customElements.get(name)) {
    const customElement = createCustomElement(AppComponent, {
      injector: applicationRef.injector,
    });
    customElements.define(name, customElement);
  }
})();

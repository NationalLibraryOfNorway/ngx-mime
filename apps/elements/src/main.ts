import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { provideHttpClient } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { provideMimeViewerIntl } from '@nationallibraryofnorway/ngx-mime';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

(async () => {
  const name = 'app-mime-viewer';
  const applicationRef = await createApplication({
    providers: [
      provideHttpClient(),
      provideMimeViewerIntl(),
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

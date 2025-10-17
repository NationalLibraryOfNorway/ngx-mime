import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { DoBootstrap, Injector, NgModule, inject } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';
import 'openseadragon';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MimeModule,
  ],
  providers: [
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ],
})
export class AppModule implements DoBootstrap {
  private injector = inject(Injector);
  private readonly name = 'app-mime-viewer';

  ngDoBootstrap() {
    if (!customElements.get(this.name)) {
      const el = createCustomElement(AppComponent, {
        injector: this.injector,
      });
      customElements.define(this.name, el);
    }
  }
}

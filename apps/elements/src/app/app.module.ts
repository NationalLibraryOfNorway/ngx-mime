import {
  FullscreenOverlayContainer,
  OverlayContainer
} from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';
import { NxModule } from '@nrwl/angular';
import 'openseadragon';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MimeModule,
    NxModule.forRoot()
  ],
  providers: [
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer }
  ],
  entryComponents: [AppComponent]
})
export class AppModule {
  private readonly name = 'app-mime-viewer';

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    if (!customElements.get(this.name)) {
      const el = createCustomElement(AppComponent, {
        injector: this.injector
      });
      customElements.define(this.name, el);
    }
  }
}

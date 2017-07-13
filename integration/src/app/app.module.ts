import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';

import { AppComponent } from './app.component';
import { CustomHttp } from './core/custom-http';
import { Http, RequestOptions, XHRBackend } from '@angular/http';

export function httpFactory(backend: XHRBackend, options: RequestOptions) {
  return new CustomHttp(backend, options);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MimeModule
  ],
  providers: [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

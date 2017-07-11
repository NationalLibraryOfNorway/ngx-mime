import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MimeModule } from 'ngx-mime';
import { AppComponent } from './app.component';
import { Http, RequestOptions, XHRBackend } from '@angular/http';
import { CustomHttp } from './core/custom-http';

export function httpFactory(backend: XHRBackend, options: RequestOptions) {
  return new CustomHttp(backend, options);
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MimeModule],
  declarations: [AppComponent],
  providers: [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

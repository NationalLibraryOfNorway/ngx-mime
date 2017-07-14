import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { Http, RequestOptions, XHRBackend, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer/viewer.component';
import { CustomHttp } from './core/custom-http';

import 'hammerjs';

export function httpFactory(backend: XHRBackend, options: RequestOptions) {
  return new CustomHttp(backend, options);
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    ViewerComponent
  ],
  providers: [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

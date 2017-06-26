import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MimeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

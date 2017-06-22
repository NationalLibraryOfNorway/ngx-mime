import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, MimeModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer/viewer.component';

import 'hammerjs';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    ViewerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

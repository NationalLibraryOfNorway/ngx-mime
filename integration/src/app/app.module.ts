import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';

import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer/viewer.component';

const appRoutes: Routes = [{ path: '', component: ViewerComponent }];

@NgModule({
  declarations: [AppComponent, ViewerComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, RouterModule.forRoot(appRoutes), FlexLayoutModule, MimeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

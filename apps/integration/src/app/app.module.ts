import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NxModule } from '@nrwl/angular';
import 'hammerjs';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';
import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer/viewer.component';

const appRoutes: Routes = [{ path: '', component: ViewerComponent }];

@NgModule({
  declarations: [AppComponent, ViewerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule,
    MimeModule,
    NxModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

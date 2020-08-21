import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NxModule } from '@nrwl/angular';
import { MimeModule } from '@nationallibraryofnorway/ngx-mime';
import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer/viewer.component';

const appRoutes: Routes = [{ path: '', component: ViewerComponent }];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent, ViewerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
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

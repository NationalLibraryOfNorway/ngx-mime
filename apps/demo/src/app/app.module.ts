import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxModule } from '@nrwl/angular';
import 'hammerjs';
import 'openseadragon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ViewerComponent } from './viewer/viewer.component';
import { FullscreenOverlayContainer, OverlayContainer } from "@angular/cdk/overlay";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    NxModule.forRoot()
  ],
  providers: [{provide: OverlayContainer, useClass: FullscreenOverlayContainer}],
  declarations: [AppComponent, ViewerComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

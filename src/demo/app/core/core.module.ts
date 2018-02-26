import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpHandler, HttpClient } from '@angular/common/http';

import { SharedModule } from './../shared/shared.module';
import { AuthInterceptor } from './auth.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ManifestService } from './manifest-service/manifest.service';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [SidenavComponent, NavbarComponent],
  exports: [SidenavComponent, NavbarComponent],
  providers: [ManifestService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}

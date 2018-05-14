import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpHandler, HttpClient } from '@angular/common/http';

import { SharedModule } from './../shared/shared.module';
import { AuthInterceptor } from './auth.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ManifestService } from './manifest-service/manifest.service';
import { ThemePickerComponent } from './navbar/theme-picker/theme-picker.component';
import { ThemeService } from './navbar/theme-picker/theme-service/theme.service';
import { StyleManagerService } from './navbar/theme-picker/style-manager/style-manager.service';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [SidenavComponent, NavbarComponent, ThemePickerComponent],
  exports: [SidenavComponent, NavbarComponent],
  providers: [ManifestService, ThemeService, StyleManagerService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
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

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AuthInterceptor } from './auth.interceptor';
import { ManifestService } from './manifest-service/manifest.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ThemePickerComponent } from './navbar/theme-picker/theme-picker.component';
import { ThemeService } from './navbar/theme-picker/theme-service/theme.service';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [SidenavComponent, NavbarComponent, ThemePickerComponent],
  exports: [SidenavComponent, NavbarComponent],
  providers: [
    ManifestService,
    ThemeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}

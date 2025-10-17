import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AuthInterceptor } from './auth.interceptor';
import { ManifestService } from './manifest-service/manifest.service';
import { NavbarComponent } from './navbar/navbar.component';
import { StyleManagerService } from './navbar/theme-picker/style-manager/style-manager.service';
import { ThemePickerComponent } from './navbar/theme-picker/theme-picker.component';
import { ThemeService } from './navbar/theme-picker/theme-service/theme.service';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    SidenavComponent,
    NavbarComponent,
    ThemePickerComponent,
  ],
  exports: [SidenavComponent, NavbarComponent],
  providers: [
    ManifestService,
    ThemeService,
    StyleManagerService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor() {
    const parentModule = inject(CoreModule, { optional: true, skipSelf: true });

    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only',
      );
    }
  }
}

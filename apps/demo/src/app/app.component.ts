import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ThemeService } from './core/navbar/theme-picker/theme-service/theme.service';
import { SidenavComponent } from './core/sidenav/sidenav.component';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatSidenavModule, SidenavComponent, NavbarComponent, RouterOutlet],
})
export class AppComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly overlayContainer = inject(OverlayContainer);
  private readonly themeService = inject(ThemeService);

  readonly isHandsetOrTabletInPortrait = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(map(({ matches }) => matches)),
    { initialValue: false },
  );
  readonly sidenavMode = computed<MatDrawerMode>(() =>
    this.isHandsetOrTabletInPortrait() ? 'over' : 'side',
  );
  readonly sidenavIsOpen = computed(() => !this.isHandsetOrTabletInPortrait());

  constructor() {
    effect(() => {
      const themeName = this.themeService.currentTheme().name;

      this.applyThemeToOverlay(themeName);
    });
  }

  private applyThemeToOverlay(themeName: string): void {
    const overlayClasses =
      this.overlayContainer.getContainerElement().classList;
    overlayClasses.add(themeName);
  }
}

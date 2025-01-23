import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import {
  SiteTheme,
  ThemeService,
} from './core/navbar/theme-picker/theme-service/theme.service';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  sidenavMode: MatDrawerMode = 'side';
  sidenavIsOpen = false;
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly overlayContainer: OverlayContainer,
    private readonly themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
        .subscribe((result: BreakpointState) => {
          this.layout(result.matches);
        }),
    );

    this.setTheme(this.themeService.getStoredTheme().name);
    this.subscriptions.add(
      this.themeService.onThemeUpdate.subscribe((theme: SiteTheme) => {
        this.setTheme(theme.name);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private layout(isHandsetOrTabletInPortrait: boolean) {
    if (isHandsetOrTabletInPortrait) {
      this.sidenavMode = 'over';
      this.sidenavIsOpen = false;
    } else {
      this.sidenavMode = 'side';
      this.sidenavIsOpen = true;
    }
  }

  private setTheme(name: string) {
    this.overlayContainer.getContainerElement().classList.add(name);
  }
}

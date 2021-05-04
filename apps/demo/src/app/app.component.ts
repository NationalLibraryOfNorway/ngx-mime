import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
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
  currentTheme: string;
  private subscriptions = new Subscription();

  constructor(
    private mediaObserver: MediaObserver,
    private overlayContainer: OverlayContainer,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.mediaObserver.asObservable().subscribe((changes: MediaChange[]) => {
        this.layout();
      })
    );

    this.layout();
    this.setTheme(this.themeService.getStoredTheme().name);
    this.overlayContainer
      .getContainerElement()
      .classList.add(this.currentTheme);
    this.subscriptions.add(
      this.themeService.onThemeUpdate.subscribe((theme: SiteTheme) => {
        this.setTheme(theme.name);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private layout() {
    if (this.mediaObserver.isActive('lt-md')) {
      this.sidenavMode = 'over';
      this.sidenavIsOpen = false;
    } else {
      this.sidenavMode = 'side';
      this.sidenavIsOpen = true;
    }
  }

  private setTheme(name: string) {
    this.overlayContainer
      .getContainerElement()
      .classList.remove(this.currentTheme);
    this.currentTheme = name;
    this.overlayContainer.getContainerElement().classList.add(name);
  }
}

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import {
  SiteTheme,
  ThemeService
} from './core/navbar/theme-picker/theme-service/theme.service';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  watcher: Subscription;
  sidenavMode = 'side';
  sidenavIsOpen = false;
  currentTheme: string;

  constructor(
    private mediaObserver: MediaObserver,
    private overlayContainer: OverlayContainer,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.watcher = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        this.layout();
      }
    );

    this.layout();
    this.setTheme(this.themeService.getStoredTheme().name);
    this.overlayContainer
      .getContainerElement()
      .classList.add(this.currentTheme);
    this.themeService.onThemeUpdate.subscribe((theme: SiteTheme) => {
      this.setTheme(theme.name);
    });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
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

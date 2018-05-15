import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';

import { SiteTheme, ThemeService } from './theme-service/theme.service';
import { StyleManagerService } from './style-manager/style-manager.service';

@Component({
  selector: 'demo-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemePickerComponent {
  currentTheme: SiteTheme;

  themes: SiteTheme[];

  constructor(private themeService: ThemeService, private styleManager: StyleManagerService) {
    this.themes = themeService.getAllThemes();
    this.currentTheme = themeService.getStoredTheme();
    if (this.currentTheme) {
      this.installTheme(this.currentTheme);
    }
  }

  installTheme(theme: SiteTheme) {
    this.currentTheme = theme;
    this.styleManager.setStyle('theme', `themes/${theme.href}`);

    if (this.currentTheme) {
      this.themeService.storeTheme(this.currentTheme);
    }
  }
}

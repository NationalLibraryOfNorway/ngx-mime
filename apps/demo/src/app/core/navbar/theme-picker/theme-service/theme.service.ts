import { EventEmitter, inject, Injectable } from '@angular/core';
import { StyleManagerService } from './../style-manager/style-manager.service';

export interface SiteTheme {
  name: string;
  primary: string;
  isDark?: boolean;
  isDefault?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  static readonly storageKey = 'docs-theme-storage-current';
  onThemeUpdate: EventEmitter<SiteTheme> = new EventEmitter<SiteTheme>();
  private readonly styleManagerService = inject(StyleManagerService);
  private readonly themes: SiteTheme[] = [
    {
      name: 'cyan-theme',
      primary: '#008585',
      isDark: true,
      isDefault: true,
    },
    {
      name: 'rose-theme',
      primary: '#e80074',
      isDark: true,
      isDefault: false,
    },
    {
      name: 'blue-theme',
      primary: '#4470e5',
      isDark: false,
    },
    {
      name: 'spring-green-theme',
      primary: '#008942',
      isDark: false,
      isDefault: false,
    },
  ];

  getAllThemes() {
    return this.themes;
  }

  storeTheme(theme: SiteTheme) {
    try {
      window.localStorage[ThemeService.storageKey] = JSON.stringify(theme);
      this.themes
        .filter((theme) => !theme.isDefault)
        .forEach((theme) => this.styleManagerService.removeStyle(theme.name));
      if (!theme.isDefault) {
        this.styleManagerService.setStyle(theme.name, `${theme.name}.css`);
      }
    } catch (e) {}

    this.onThemeUpdate.emit(theme);
  }

  getStoredTheme(): SiteTheme {
    try {
      return JSON.parse(
        window.localStorage[ThemeService.storageKey] || this.getDefaultTheme(),
      );
    } catch (e) {
      return this.getDefaultTheme();
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeService.storageKey);
    } catch (e) {}
  }

  private getDefaultTheme() {
    return this.themes.filter((t) => t.isDefault)[0];
  }
}

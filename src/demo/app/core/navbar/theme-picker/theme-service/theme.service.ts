import { Injectable, EventEmitter } from '@angular/core';

export interface SiteTheme {
  href: string;
  accent: string;
  primary: string;
  isDark?: boolean;
  isDefault?: boolean;
}

@Injectable()
export class ThemeService {
  static storageKey = 'docs-theme-storage-current';
  onThemeUpdate: EventEmitter<SiteTheme> = new EventEmitter<SiteTheme>();
  private themes: SiteTheme[] = [
    {
      primary: '#5d4037',
      accent: '#b0bec5',
      href: 'brown-theme.css',
      isDark: false,
      isDefault: true
    },
    {
      primary: '#18ffff',
      accent: '#b2ff59',
      href: 'cyan-theme.css',
      isDark: true
    }
  ];

  getAllThemes() {
    return this.themes;
  }

  storeTheme(theme: SiteTheme) {
    try {
      window.localStorage[ThemeService.storageKey] = JSON.stringify(theme);
    } catch (e) {}

    this.onThemeUpdate.emit(theme);
  }

  getStoredTheme(): SiteTheme {
    try {
      return JSON.parse(window.localStorage[ThemeService.storageKey] || this.getDefaultTheme());
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
    return this.themes.filter(t => t.isDefault)[0];
  }
}

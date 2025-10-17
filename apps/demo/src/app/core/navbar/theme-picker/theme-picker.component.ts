import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteTheme, ThemeService } from './theme-service/theme.service';

@Component({
  selector: 'demo-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ThemePickerComponent {
  private readonly themeService = inject(ThemeService);
  currentTheme: SiteTheme;
  themes: SiteTheme[];

  constructor() {
    const themeService = this.themeService;

    this.themes = themeService.getAllThemes();
    this.currentTheme = themeService.getStoredTheme();
    if (this.currentTheme) {
      this.installTheme(this.currentTheme);
    }
  }

  installTheme(theme: SiteTheme) {
    this.currentTheme = theme;

    if (this.currentTheme) {
      this.themeService.storeTheme(this.currentTheme);
    }
  }
}

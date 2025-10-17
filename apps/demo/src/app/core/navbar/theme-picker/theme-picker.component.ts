import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteTheme, ThemeService } from './theme-service/theme.service';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'demo-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconButton,
    MatTooltip,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatGridList,
    MatGridTile,
    MatMenuItem,
  ],
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

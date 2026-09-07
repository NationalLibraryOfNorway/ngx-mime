import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { SiteTheme, ThemeService } from './theme-service/theme.service';

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

  readonly themes = this.themeService.getAllThemes();
  readonly currentTheme = this.themeService.currentTheme;

  constructor() {
    this.installTheme(this.currentTheme());
  }

  installTheme(theme: SiteTheme): void {
    this.themeService.storeTheme(theme);
  }
}

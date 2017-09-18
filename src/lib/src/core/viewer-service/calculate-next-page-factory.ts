import { NavigatorCalculateNextPageStrategy } from './navigator-calculate-next-page-strategy';
import { CalculateNextPageStrategy } from './calculate-next-page-strategy';
import { ViewerMode } from '../models/viewer-mode';
import { DashboardModeCalculateNextPageStrategy } from './dashboard-mode-calculate-next-page-strategy';
import { PageModeCalculateNextPageStrategy } from './page-mode-calculate-next-page-strategy';

export class CalculateNextPageFactory {

  public static create(mode: ViewerMode): CalculateNextPageStrategy {
    if (mode === ViewerMode.DASHBOARD) {
      return new DashboardModeCalculateNextPageStrategy();
    } else if (mode === ViewerMode.PAGE) {
      return new PageModeCalculateNextPageStrategy();
    } else {
      return new NavigatorCalculateNextPageStrategy();
    }
  }
}

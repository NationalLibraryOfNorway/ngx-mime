import { PageZoomedModeCalculateNextPageStrategy } from './page-zoomed-mode-calculate-next-page-strategy';
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
    } else if (mode === ViewerMode.PAGE_ZOOMED) {
      return new PageZoomedModeCalculateNextPageStrategy();
    } else {
      return new NavigatorCalculateNextPageStrategy();
    }
  }
}

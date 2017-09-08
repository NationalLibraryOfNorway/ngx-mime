import {
  CalculateNextPageStrategy,
  DashboardModeCalculateNextPageStrategy,
  PageModeCalculateNextPageStrategy
} from './calculate-next-page-strategy';
import { ViewerMode } from '../models/viewer-mode';

export class CalculateNextPageFactory {
  public static create(mode: ViewerMode): CalculateNextPageStrategy {
    if (mode === ViewerMode.DASHBOARD) {
      return new DashboardModeCalculateNextPageStrategy();
    } else if (mode === ViewerMode.PAGE) {
      return new PageModeCalculateNextPageStrategy();
    }
    return null;
  }
}

import { ViewerMode } from '../models/viewer-mode';
import { NavigatorCalculateNextCanvasGroupStrategy } from './navigator-calculate-next-canvas-group-strategy';
import { CalculateNextCanvasGroupStrategy } from './calculate-next-canvas-group-strategy';
import { DashboardModeCalculateNextCanvasGroupStrategy } from './dashboard-mode-calculate-next-canvas-group-strategy';
import { PageModeCalculateNextCanvasGroupStrategy } from './page-mode-calculate-next-canvas-group-strategy';
import { PageZoomedModeCalculateNextCanvasGroupStrategy } from './page-zoomed-mode-calculate-next-canvas-group-strategy';

export class CalculateNextCanvasGroupFactory {
  public static create(mode: ViewerMode): CalculateNextCanvasGroupStrategy {
    if (mode === ViewerMode.DASHBOARD) {
      return new DashboardModeCalculateNextCanvasGroupStrategy();
    } else if (mode === ViewerMode.PAGE) {
      return new PageModeCalculateNextCanvasGroupStrategy();
    } else if (mode === ViewerMode.PAGE_ZOOMED) {
      return new PageZoomedModeCalculateNextCanvasGroupStrategy();
    } else {
      return new NavigatorCalculateNextCanvasGroupStrategy();
    }
  }
}

import { CalculateCanvasGroupPositionStrategy, CanvasGroupPositionCriteria } from './calculate-canvas-group-position-strategy';
import { Rect } from '../models/rect';
import { ViewerOptions } from '../models/viewer-options';

export class OnePageCalculatePagePositionStrategy implements CalculateCanvasGroupPositionStrategy {
  calculateCanvasGroupPosition(criteria: CanvasGroupPositionCriteria): Rect {
    let x: number;

    if (!criteria.canvasGroupIndex) {
      x = criteria.canvasSource.width / 2 * -1;
    } else {
      x =
        criteria.previousCanvasGroupPosition.x +
        criteria.previousCanvasGroupPosition.width +
        ViewerOptions.overlays.canvasGroupMarginInDashboardView;
    }

    return new Rect({
      height: criteria.canvasSource.height,
      width: criteria.canvasSource.width,
      x: x,
      y: criteria.canvasSource.height / 2 * -1
    });
  }
}

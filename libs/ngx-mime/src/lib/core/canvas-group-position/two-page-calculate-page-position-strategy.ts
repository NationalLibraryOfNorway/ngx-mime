import {
  CalculateCanvasGroupPositionStrategy,
  CanvasGroupPositionCriteria
} from './calculate-canvas-group-position-strategy';
import { Rect } from '../models/rect';
import { ViewerOptions } from '../models/viewer-options';

export class TwoPageCalculateCanvasGroupPositionStrategy
  implements CalculateCanvasGroupPositionStrategy {
  calculateCanvasGroupPosition(criteria: CanvasGroupPositionCriteria): Rect {
    let x: number;

    if (!criteria.canvasGroupIndex) {
      // First page
      x = 0;
    } else if (criteria.canvasGroupIndex % 2) {
      // Even page numbers
      x =
        criteria.previousCanvasGroupPosition.x +
        criteria.previousCanvasGroupPosition.width +
        ViewerOptions.overlays.canvasGroupMarginInDashboardView;
    } else {
      // Odd page numbers
      x =
        criteria.previousCanvasGroupPosition.x +
        criteria.previousCanvasGroupPosition.width;
    }

    return new Rect({
      height: criteria.canvasSource.height,
      width: criteria.canvasSource.width,
      x: x,
      y: (criteria.canvasSource.height / 2) * -1
    });
  }
}

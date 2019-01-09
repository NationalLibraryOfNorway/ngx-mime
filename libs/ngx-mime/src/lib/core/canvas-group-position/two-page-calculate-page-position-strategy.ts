import { Rect } from '../models/rect';
import { ViewerOptions } from '../models/viewer-options';
import { ViewingDirection } from '../models/viewing-direction';
import {
  CalculateCanvasGroupPositionStrategy,
  CanvasGroupPositionCriteria
} from './calculate-canvas-group-position-strategy';

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
        criteria.viewingDirection === ViewingDirection.LTR
          ? this.calculateEvenLtrX(criteria)
          : this.calculateEvenRtlX(criteria);
    } else {
      // Odd page numbers
      x =
        criteria.viewingDirection === ViewingDirection.LTR
          ? this.calculateOddLtrX(criteria)
          : this.calculateOddRtlX(criteria);
    }

    return new Rect({
      height: criteria.canvasSource.height,
      width: criteria.canvasSource.width,
      x: x,
      y: (criteria.canvasSource.height / 2) * -1
    });
  }

  private calculateEvenLtrX(criteria: CanvasGroupPositionCriteria) {
    return (
      criteria.previousCanvasGroupPosition.x +
      criteria.previousCanvasGroupPosition.width +
      ViewerOptions.overlays.canvasGroupMarginInDashboardView
    );
  }

  private calculateOddLtrX(criteria: CanvasGroupPositionCriteria) {
    return (
      criteria.previousCanvasGroupPosition.x +
      criteria.previousCanvasGroupPosition.width
    );
  }

  private calculateEvenRtlX(criteria: CanvasGroupPositionCriteria) {
    return (
      criteria.previousCanvasGroupPosition.x -
      criteria.canvasSource.width -
      ViewerOptions.overlays.canvasGroupMarginInDashboardView
    );
  }

  private calculateOddRtlX(criteria: CanvasGroupPositionCriteria) {
    return criteria.previousCanvasGroupPosition.x - criteria.canvasSource.width;
  }
}

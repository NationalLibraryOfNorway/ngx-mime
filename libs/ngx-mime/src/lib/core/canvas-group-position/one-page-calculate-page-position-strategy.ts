import { Rect } from '../models/rect';
import { ViewerOptions } from '../models/viewer-options';
import { ViewingDirection } from '../models/viewing-direction';
import {
  CalculateCanvasGroupPositionStrategy,
  CanvasGroupPositionCriteria
} from './calculate-canvas-group-position-strategy';

export class OnePageCalculatePagePositionStrategy
  implements CalculateCanvasGroupPositionStrategy {
  calculateCanvasGroupPosition(criteria: CanvasGroupPositionCriteria): Rect {
    let x: number;

    if (!criteria.canvasGroupIndex) {
      x = (criteria.canvasSource.width / 2) * -1;
    } else {
      x =
        criteria.viewingDirection === ViewingDirection.LTR
          ? this.calculateLtrX(criteria)
          : this.calculateRtlX(criteria);
    }

    return new Rect({
      height: criteria.canvasSource.height,
      width: criteria.canvasSource.width,
      x: x,
      y: (criteria.canvasSource.height / 2) * -1
    });
  }

  private calculateLtrX(criteria: CanvasGroupPositionCriteria) {
    return (
      criteria.previousCanvasGroupPosition.x +
      criteria.previousCanvasGroupPosition.width +
      ViewerOptions.overlays.canvasGroupMarginInDashboardView
    );
  }

  private calculateRtlX(criteria: CanvasGroupPositionCriteria) {
    return (
      criteria.previousCanvasGroupPosition.x -
      criteria.previousCanvasGroupPosition.width -
      ViewerOptions.overlays.canvasGroupMarginInDashboardView
    );
  }
}

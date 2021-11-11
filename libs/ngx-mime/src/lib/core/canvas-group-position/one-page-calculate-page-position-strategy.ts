import { MimeViewerConfig } from '../mime-viewer-config';
import { Rect } from '../models/rect';
import { ViewerOptions } from '../models/viewer-options';
import { ViewingDirection } from '../models/viewing-direction';
import {
  CalculateCanvasGroupPositionStrategy,
  CanvasGroupPositionCriteria,
} from './calculate-canvas-group-position-strategy';
import { canvasRectFromCriteria } from './calculate-canvas-group-position-utils';

export class OnePageCalculatePagePositionStrategy
  implements CalculateCanvasGroupPositionStrategy {
  constructor(private config: MimeViewerConfig) {}
  calculateCanvasGroupPosition(
    criteria: CanvasGroupPositionCriteria,
    rotation: number = 0
  ): Rect {
    let x: number;
    if (!criteria.canvasGroupIndex) {
      if (rotation === 90 || rotation === 270) {
        x = (criteria.canvasSource.height / 2) * -1;
      } else {
        x = (criteria.canvasSource.width / 2) * -1;
      }
    } else {
      x =
        criteria.viewingDirection === ViewingDirection.LTR
          ? this.calculateLtrX(criteria)
          : this.calculateRtlX(criteria);
    }
    return canvasRectFromCriteria(
      rotation,
      criteria,
      x,
      this.config.ignorePhysicalScale
    );
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

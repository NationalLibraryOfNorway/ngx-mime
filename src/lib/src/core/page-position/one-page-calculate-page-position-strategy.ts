import { CalculatePagePositionStrategy, PagePositionCriteria } from './calculate-page-position-strategy';
import { Rect } from '../models/rect';
import { ViewerOptions } from '../models/viewer-options';

export class OnePageCalculatePagePositionStrategy implements CalculatePagePositionStrategy {
  calculatePagePosition(criteria: PagePositionCriteria): Rect {
    let x: number;

    if (!criteria.pageIndex) {
      x = criteria.pageSource.width / 2 * -1;
    } else {
      x = criteria.previousPagePosition.x + criteria.previousPagePosition.width + ViewerOptions.overlays.canvasGroupMarginDashboardView;
    }

    return new Rect({
      height: criteria.pageSource.height,
      width: criteria.pageSource.width,
      x: x,
      y: criteria.pageSource.height / 2 * -1
    });
  }
}

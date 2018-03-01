import { CalculatePagePositionStrategy, PagePositionCriteria } from './calculate-page-position-strategy';
import { Rect } from '../models/rect';
import { ViewerOptions } from '../models/viewer-options';

export class TwoPageCalculatePagePositionStrategy implements CalculatePagePositionStrategy {
  calculatePagePosition(criteria: PagePositionCriteria): Rect {
    let x: number;

    if (!criteria.pageIndex) {
      // First page
      x = 0;
    } else if (criteria.pageIndex % 2) {
      // Even page numbers
      x = criteria.previousPagePosition.x + criteria.previousPagePosition.width + ViewerOptions.overlays.canvasGroupMarginDashboardView;
    } else {
      // Odd page numbers
      x = criteria.previousPagePosition.x + criteria.previousPagePosition.width;
    }

    return new Rect({
      height: criteria.pageSource.height,
      width: criteria.pageSource.width,
      x: x,
      y: criteria.pageSource.height / 2 * -1
    });
  }
}

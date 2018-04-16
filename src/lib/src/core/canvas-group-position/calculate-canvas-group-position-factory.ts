import { CalculateCanvasGroupPositionStrategy } from './calculate-canvas-group-position-strategy';
import { OnePageCalculatePagePositionStrategy } from './one-page-calculate-page-position-strategy';
import { TwoPageCalculateCanvasGroupPositionStrategy } from './two-page-calculate-page-position-strategy';
import { ViewerLayout } from '../models/viewer-layout';

export class CalculateCanvasGroupPositionFactory {
  public static create(viewerLayout: ViewerLayout, paged: boolean): CalculateCanvasGroupPositionStrategy {
    if (viewerLayout === ViewerLayout.ONE_PAGE || !paged) {
      return new OnePageCalculatePagePositionStrategy();
    } else if (viewerLayout === ViewerLayout.TWO_PAGE) {
      return new TwoPageCalculateCanvasGroupPositionStrategy();
    }
  }
}

import { CalculatePagePositionStrategy } from './calculate-page-position-strategy';
import { OnePageCalculatePagePositionStrategy } from './one-page-calculate-page-position-strategy';
import { TwoPageCalculatePagePositionStrategy } from './two-page-calculate-page-position-strategy';
import { ViewerLayout } from '../models/viewer-layout';

export class CalculatePagePositionFactory {

  public static create(viewerLayout: ViewerLayout, paged: boolean): CalculatePagePositionStrategy {
    if (viewerLayout === ViewerLayout.ONE_PAGE || !paged) {
      return new OnePageCalculatePagePositionStrategy();
    } else if (viewerLayout === ViewerLayout.TWO_PAGE) {
      return new TwoPageCalculatePagePositionStrategy();
    }
  }
}

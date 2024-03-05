import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';
import { CalculateCanvasGroupPositionStrategy } from './calculate-canvas-group-position-strategy';
import { OnePageCalculatePagePositionStrategy } from './one-page-calculate-page-position-strategy';
import { TwoPageCalculateCanvasGroupPositionStrategy } from './two-page-calculate-page-position-strategy';

export class CalculateCanvasGroupPositionFactory {
  public static create(
    viewerLayout: ViewerLayout,
    config: MimeViewerConfig,
  ): CalculateCanvasGroupPositionStrategy {
    if (viewerLayout === ViewerLayout.ONE_PAGE) {
      return new OnePageCalculatePagePositionStrategy(config);
    } else {
      return new TwoPageCalculateCanvasGroupPositionStrategy(config);
    }
  }
}

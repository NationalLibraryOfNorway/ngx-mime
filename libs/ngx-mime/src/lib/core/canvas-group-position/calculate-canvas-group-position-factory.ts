import { CalculateCanvasGroupPositionStrategy } from './calculate-canvas-group-position-strategy';
import { OnePageCalculatePagePositionStrategy } from './one-page-calculate-page-position-strategy';
import { TwoPageCalculateCanvasGroupPositionStrategy } from './two-page-calculate-page-position-strategy';
import { ViewerLayout } from '../models/viewer-layout';
import { MimeViewerConfig } from '../mime-viewer-config';

export class CalculateCanvasGroupPositionFactory {
  public static create(
    viewerLayout: ViewerLayout,
    paged: boolean,
    config: MimeViewerConfig
  ): CalculateCanvasGroupPositionStrategy {
    if (viewerLayout === ViewerLayout.ONE_PAGE || !paged) {
      return new OnePageCalculatePagePositionStrategy(config);
    } else {
      return new TwoPageCalculateCanvasGroupPositionStrategy(config);
    }
  }
}

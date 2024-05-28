import { ViewerLayout } from '../models/viewer-layout';
import { OneCanvasPerCanvasGroupStrategy } from './one-canvas-per-canvas-group-strategy';
import { TwoCanvasPerCanvasGroupStrategy } from './two-canvas-per-canvas-group-strategy';

export class CanvasGroupStrategyFactory {
  public static create(
    layout: ViewerLayout,
    config: any,
    viewingDirection: any,
    rotation: any,
  ) {
    if (layout === ViewerLayout.ONE_PAGE) {
      return new OneCanvasPerCanvasGroupStrategy(
        config,
        viewingDirection,
        rotation,
      );
    } else {
      return new TwoCanvasPerCanvasGroupStrategy(
        config,
        viewingDirection,
        rotation,
      );
    }
  }
}

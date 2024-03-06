import { ViewerLayout } from '../models/viewer-layout';
import {
  OneCanvasPerCanvasGroupStrategy,
  TwoCanvasPerCanvasGroupStrategy,
} from './canvas-group.strategy';

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

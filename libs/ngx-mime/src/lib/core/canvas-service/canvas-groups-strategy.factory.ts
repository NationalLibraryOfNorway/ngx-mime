import { ViewerLayout } from '../models/viewer-layout';
import {
  OneCanvasPerCanvasGroupStrategy,
  TwoCanvasPerCanvasGroupStrategy,
} from './canvas-group.strategy';

export class CanvasGroupStrategyFactory {
  public static create(layout: ViewerLayout) {
    if (layout === ViewerLayout.ONE_PAGE) {
      return new OneCanvasPerCanvasGroupStrategy();
    } else {
      return new TwoCanvasPerCanvasGroupStrategy();
    }
  }
}

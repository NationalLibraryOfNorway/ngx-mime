import { Point } from '../models/point';
import { Side } from '../models/side';
import { Direction } from '../models/direction';
import { Bounds } from '../models/bounds';
import { ViewerOptions } from '../models/viewer-options';
export class SwipeUtils {

  // TODO: Add sensitivity-threshold or join with getZoomedInSwipeDirection()?
  static getSwipeDirection(start: number, end: number): Direction {
    return start > end ? Direction.LEFT : Direction.RIGHT;
  }

  // Added threshold to prevent sensitive direction-calculation when zoomed in
  static getZoomedInSwipeDirection(start: Point, end: Point): Direction {
    const deltaX = Math.abs(start.x - end.x);
    const deltaY = Math.abs(start.y - end.y);
    const deltaXMinusThreshold = deltaX - ViewerOptions.pan.swipeDirectionZoomedThreshold;

    if (start.x > end.x && (deltaXMinusThreshold > deltaY)) {
      return Direction.LEFT;
    } else if (start.x < end.x && (deltaXMinusThreshold > deltaY)) {
      return Direction.RIGHT;
    }
  }

  static getSideIfPanningPastEndOfPage(pageBounds: Bounds, vpBounds: Bounds): Side {
    if (this.isPanningOutsideLeft(pageBounds, vpBounds)) {
      return Side.LEFT;
    } else if (this.isPanningOutsideRight(pageBounds, vpBounds)) {
      return Side.RIGHT;
    }
  }

  static isPanningOutsidePage(pageBounds: Bounds, vpBounds: Bounds): boolean {
    return this.isPanningOutsideLeft(pageBounds, vpBounds) || this.isPanningOutsideRight(pageBounds, vpBounds);
  }

  static isPanningOutsideLeft(pageBounds: Bounds, vpBounds: Bounds): boolean {
    return vpBounds.x < pageBounds.x;
  }

  static isPanningOutsideRight(pageBounds: Bounds, vpBounds: Bounds): boolean {
    return vpBounds.x + vpBounds.width > pageBounds.x + pageBounds.width;
  }

  static isPanningPastCenter(pageBounds: Bounds, vpCenter: Point): boolean {
    const isPastCenterRight = pageBounds.x + pageBounds.width < vpCenter.x;
    const isPastCenterLeft = pageBounds.x > vpCenter.x;
    return isPastCenterRight || isPastCenterLeft;
  }
}

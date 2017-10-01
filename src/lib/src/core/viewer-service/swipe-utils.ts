import { Point } from '../models/point';
import { Side } from '../models/side';
import { Direction } from '../models/direction';
import { Bounds } from '../models/bounds';
import { ViewerOptions } from '../models/viewer-options';
export class SwipeUtils {

  static getSwipeDirection(start: number, end: number): Direction {
    return start > end ? Direction.LEFT : Direction.RIGHT;
  }

  // Added threshold to prevent sensitive direction-calculation when zoomed in
  static getZoomedInSwipeDirection(startX: number, endX: number, startY: number, endY: number): Direction {
    const deltaX = Math.abs(startX - endX);
    const deltaY = Math.abs(startY - endY);

    if (startX > endX && (deltaX - ViewerOptions.pan.swipeDirectionZoomedThreshold > deltaY)) {
      return Direction.LEFT;
    } else if (startX < endX && (deltaX - ViewerOptions.pan.swipeDirectionZoomedThreshold > deltaY)) {
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

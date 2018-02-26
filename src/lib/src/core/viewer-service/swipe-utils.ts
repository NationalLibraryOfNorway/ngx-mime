import { Rect } from '../models/rect';
import { Point } from '../models/point';
import { Side } from '../models/side';
import { Direction } from '../models/direction';
import { ViewerOptions } from '../models/viewer-options';
export class SwipeUtils {
  // Added threshold to prevent sensitive direction-calculation when zoomed in
  static getSwipeDirection(start: Point, end: Point, useThreshold?: boolean): Direction {
    let deltaX = Math.abs(start.x - end.x);
    const deltaY = Math.abs(start.y - end.y);
    deltaX = useThreshold ? deltaX - ViewerOptions.pan.swipeDirectionThreshold : deltaX;

    if (start.x > end.x && deltaX >= deltaY) {
      return Direction.LEFT;
    } else if (start.x < end.x && deltaX >= deltaY) {
      return Direction.RIGHT;
    }
  }

  static getSideIfPanningPastEndOfPage(pageBounds: Rect, vpBounds: Rect): Side {
    if (this.isPanningOutsideLeft(pageBounds, vpBounds)) {
      return Side.LEFT;
    } else if (this.isPanningOutsideRight(pageBounds, vpBounds)) {
      return Side.RIGHT;
    }
  }

  static isPanningOutsidePage(pageBounds: Rect, vpBounds: Rect): boolean {
    return this.isPanningOutsideLeft(pageBounds, vpBounds) || this.isPanningOutsideRight(pageBounds, vpBounds);
  }

  static isPanningOutsideLeft(pageBounds: Rect, vpBounds: Rect): boolean {
    return vpBounds.x < pageBounds.x;
  }

  static isPanningOutsideRight(pageBounds: Rect, vpBounds: Rect): boolean {
    return vpBounds.x + vpBounds.width > pageBounds.x + pageBounds.width;
  }

  /**
   *
   * @param direction Current computed direction, expressed as an
   * angle counterclockwise relative to the positive X axis (-pi to pi, in radians).
   * Only valid if speed > 0.
   */
  static isDirectionInRightSemicircle(direction: number): boolean {
    return direction > -Math.PI / 2 && direction < Math.PI / 2;
  }

  /**
   * @param direction @see isDirectionInRightSemicircle
   */
  static isDirectionInLeftSemicircle(direction: number): boolean {
    return !this.isDirectionInRightSemicircle(direction) || direction === 0; // fix for speed = 0
  }
}

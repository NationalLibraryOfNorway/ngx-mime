import { ViewerMode } from '../models/viewer-mode';
import { Point } from '../models/point';
import { Side } from '../models/side';
import { Direction } from '../models/direction';
import { Bounds } from '../models/bounds';
import { ViewerOptions } from '../models/viewer-options';
export class SwipeUtils {


  // Added threshold to prevent sensitive direction-calculation when zoomed in
  static getSwipeDirection(mode: ViewerMode, start: Point, end: Point): Direction {
    let deltaX = Math.abs(start.x - end.x);
    const deltaY = Math.abs(start.y - end.y);
    deltaX = (mode === ViewerMode.PAGE_ZOOMED) ? deltaX - ViewerOptions.pan.swipeDirectionZoomedThreshold : deltaX;

    if (start.x > end.x && (deltaX >= deltaY)) {
      return Direction.LEFT;
    } else if (start.x < end.x && (deltaX >= deltaY)) {
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

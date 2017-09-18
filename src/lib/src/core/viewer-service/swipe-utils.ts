import { CustomOptions } from '../models/options-custom';
export class SwipeUtils {

  static getSwipeDirection(start: number, end: number) {
    return start > end ? 'left' : 'right';
  }

  static isPanningOutsidePage(pageBounds: any, viewportBounds: any): boolean {
    const isOutsideRightBound = viewportBounds.x - CustomOptions.pan.sensitivityMargin < pageBounds.x;
    const isOutsideLeftBound = viewportBounds.x + viewportBounds.width + CustomOptions.pan.sensitivityMargin > pageBounds.x + pageBounds.width;
    return isOutsideRightBound || isOutsideLeftBound;
  }

}

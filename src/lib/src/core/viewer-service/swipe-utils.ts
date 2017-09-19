import { CustomOptions } from '../models/options-custom';
export class SwipeUtils {

  // Using sensitivityMargin so it is not so sensitive to swipe-direction when zoomed in
  static getSwipeDirection(start: number, end: number) {
    if(start > end + CustomOptions.pan.sensitivityMargin) {
      return 'left';
    } else if(start + CustomOptions.pan.sensitivityMargin < end) {
      return 'right';
    }
    return undefined;
  }

  static isPanningOutsidePage(pageBounds: any, viewportBounds: any): boolean {
    const isOutsideLeftBound = viewportBounds.x - CustomOptions.pan.sensitivityMargin < pageBounds.x;
    const isOutsideRightBound = viewportBounds.x + viewportBounds.width + CustomOptions.pan.sensitivityMargin > pageBounds.x + pageBounds.width;
    return isOutsideRightBound || isOutsideLeftBound;
  }

}

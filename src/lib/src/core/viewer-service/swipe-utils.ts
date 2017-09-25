import { CustomOptions } from '../models/options-custom';
export class SwipeUtils {

  // Using sensitivityMargin so it is not so sensitive to swipe-direction when zoomed in
  static getSwipeDirection(start: number, end: number) {
    if (start > end + CustomOptions.pan.sensitivityMargin) {
      return 'left';
    } else if (start + CustomOptions.pan.sensitivityMargin < end) {
      return 'right';
    }
    return undefined;
  }

  static isPanningOutsidePage(pageBounds: any, vpBounds: any): boolean {
    return this.isPanningOutsideLeft(pageBounds, vpBounds) || this.isPanningOutsideRight(pageBounds, vpBounds);
  }

  static isPanningOutsideLeft(pageBounds: any, vpBounds: any): boolean {
    return vpBounds.x < pageBounds.x;
  }

  static isPanningOutsideRight(pageBounds: any, vpBounds: any): boolean {
    return vpBounds.x + vpBounds.width > pageBounds.x + pageBounds.width
  }

  static isPanningPastCenter(pageBounds: any, vpBounds: any): boolean {
    const isPastCenterRight = vpBounds.x > pageBounds.x + (pageBounds.width / 2);
    const isPastCenterLeft = vpBounds.x + vpBounds.width + (pageBounds.width / 2) < pageBounds.x + pageBounds.width;
    return isPastCenterRight || isPastCenterLeft;
  }
}

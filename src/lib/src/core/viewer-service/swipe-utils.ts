import { CustomOptions } from '../models/options-custom';
export class SwipeUtils {

  static getSwipeDirection(start: number, end: number) {
    return start > end ? 'left' : 'right';
  }

  // Added threshold to prevent sensitive direction-calculation when zoomed in
  static getZoomedInSwipeDirection(startX: number, endX: number, startY: number, endY: number) {
    const deltaX = Math.abs(startX - endX);
    const deltaY = Math.abs(startY - endY);

    if (startX > endX && (deltaX - CustomOptions.pan.swipeDirectionZoomedThreshold > deltaY)) {
      return 'left';
    } else if (startX < endX && (deltaX - CustomOptions.pan.swipeDirectionZoomedThreshold > deltaY)) {
      return 'right';
    }
  }

  static isPanningOutsidePage(pageBounds: any, vpBounds: any): boolean {
    return this.isPanningOutsideLeft(pageBounds, vpBounds) || this.isPanningOutsideRight(pageBounds, vpBounds);
  }

  static isPanningOutsideLeft(pageBounds: any, vpBounds: any): boolean {
    return vpBounds.x < pageBounds.x;
  }

  static isPanningOutsideRight(pageBounds: any, vpBounds: any): boolean {
    return vpBounds.x + vpBounds.width > pageBounds.x + pageBounds.width;
  }

  static isPanningPastCenter(pageBounds: any, vpBounds: any): boolean {
    const isPastCenterRight = vpBounds.x > pageBounds.x + (pageBounds.width / 2);
    const isPastCenterLeft = vpBounds.x + vpBounds.width + (pageBounds.width / 2) < pageBounds.x + pageBounds.width;
    return isPastCenterRight || isPastCenterLeft;
  }
}

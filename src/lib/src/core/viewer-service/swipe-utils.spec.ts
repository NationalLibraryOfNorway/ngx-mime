import { ViewerOptions } from '../models/viewer-options';
import { SwipeUtils } from './swipe-utils';

describe('SwipeUtils ', () => {

  it('should return right', () => {
    const direction = SwipeUtils.getSwipeDirection(0, 100);
    expect(direction).toBe('right');
  });

  it('should return left', () => {
    const direction = SwipeUtils.getSwipeDirection(100, 0);
    expect(direction).toBe('left');
  });

  it('should return left on zoomed-in-swipe', () => {
    const direction = SwipeUtils.getZoomedInSwipeDirection(100, 0, 50, 50);
    expect(direction).toBe('left');
  });

  it('should return right on zoomed-in-swipe', () => {
    const direction = SwipeUtils.getZoomedInSwipeDirection(0, 100, 50, 50);
    expect(direction).toBe('right');
  });

  it('should return undefined on zoomed-in-swipe', () => {
    const direction = SwipeUtils.getZoomedInSwipeDirection(0, 0, 50, 0);
    expect(direction).toBe(undefined);
  });

  it('should return true when panning outside right page-bounds', () => {
    const pageBounds = { x: 0, width: 200 };
    // Pan outside right bounds
    const viewportBounds = { x: 200, width: 100 };

    expect(SwipeUtils.isPanningOutsidePage(pageBounds, viewportBounds)).toBe(true);
  });

  it('should return true when panning outside left page-bounds', () => {
    const pageBounds = { x: 100, width: 200 };
    // Pan outside left bounds
    const viewportBounds = { x: 99, width: 100 };

    expect(SwipeUtils.isPanningOutsidePage(pageBounds, viewportBounds)).toBe(true);
  });

  it('should return false when not panning outside page-bounds', () => {
    const pageBounds = { x: 0, width: 200 };
    // Panning inside bounds
    const viewportBounds = { x: 60, width: 100 };

    expect(SwipeUtils.isPanningOutsidePage(pageBounds, viewportBounds)).toBe(false);
  });

  // static isPanningPastCenter(pageBounds: any, vpCenter: any): boolean {
  //   const isPastCenterRight = pageBounds.x + pageBounds.width < vpCenter.x;
  //   const isPastCenterLeft = pageBounds.x > vpCenter.x;
  //   return isPastCenterRight || isPastCenterLeft;
  // }

  it('should return true when panning past center of page on the right side', () => {
    const pageBounds = { x: 101, width: 100 };

    let center = { x: 200, y: 0 };
    expect(SwipeUtils.isPanningPastCenter(pageBounds, center)).toBe(true);

  });

  it('should return true when panning past center of page on the left side', () => {
    let pageBounds = { x: 0, width: 100 };
    let center = { x: -51, y: 0 };

    expect(SwipeUtils.isPanningPastCenter(pageBounds, center)).toBe(true);

    pageBounds = { x: 100, width: 100 };
    center = { x: 50, y: 0 };

    expect(SwipeUtils.isPanningPastCenter(pageBounds, center)).toBe(true);
  });

  it('should return false when not panning past center of page', () => {
    const pageBounds = { x: 50, width: 50 };

    // Not past center on right side
    let center = { x: 200, y: 0 };
    expect(SwipeUtils.isPanningPastCenter(pageBounds, center)).toBe(false);

    // Not past center on left side
    center = { x: 200, y: 0 };
    expect(SwipeUtils.isPanningPastCenter(pageBounds, center)).toBe(false);
  });

});

import { Direction } from '../models/direction';
import { ViewerOptions } from '../models/viewer-options';
import { SwipeUtils } from './swipe-utils';

describe('SwipeUtils ', () => {

  it('should return right', () => {
    const direction = SwipeUtils.getSwipeDirection(0, 100);
    expect(direction).toBe(Direction.RIGHT);
  });

  it('should return left', () => {
    const direction = SwipeUtils.getSwipeDirection(100, 0);
    expect(direction).toBe(Direction.LEFT);
  });

  it('should return left on zoomed-in-swipe', () => {
    const direction = SwipeUtils.getZoomedInSwipeDirection(100, 0, 50, 50);
    expect(direction).toBe(Direction.LEFT);
  });

  it('should return right on zoomed-in-swipe', () => {
    const direction = SwipeUtils.getZoomedInSwipeDirection(0, 100, 50, 50);
    expect(direction).toBe(Direction.RIGHT);
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


  it('should return true when panning past center of page on the right side', () => {
    const pageBounds = { x: 99, width: 100 };

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
    const pageBounds = { x: 100, width: 100 };

    // Not past center
    const center = { x: 199, y: 0 };
    expect(SwipeUtils.isPanningPastCenter(pageBounds, center)).toBe(false);
  });

});

import { CustomOptions } from '../models/options-custom';
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

  it('should return true when panning past center of page on the right side', () => {
    const pageBounds = { x: 0, width: 100 };

    let viewportBounds = { x: 51, width: 100 };
    expect(SwipeUtils.isPanningPastCenter(pageBounds, viewportBounds)).toBe(true);

    viewportBounds = { x: 60, width: 200 };
    expect(SwipeUtils.isPanningPastCenter(pageBounds, viewportBounds)).toBe(true);
  });

  it('should return true when panning past center of page on the left side', () => {
    let pageBounds = { x: 0, width: 100 };
    let viewportBounds = { x: -51, width: 100 };

    expect(SwipeUtils.isPanningPastCenter(pageBounds, viewportBounds)).toBe(true);

    pageBounds = { x: 100, width: 100 };
    viewportBounds = { x: 49, width: 100 };

    expect(SwipeUtils.isPanningPastCenter(pageBounds, viewportBounds)).toBe(true);
  });

  it('should return false when not panning past center of page', () => {
    const pageBounds = { x: 0, width: 100 };

    // Not past center on right side
    let viewportBounds = { x: 49, width: 100 };
    expect(SwipeUtils.isPanningPastCenter(pageBounds, viewportBounds)).toBe(false);

    // Not past center on left side
    viewportBounds = { x: -49, width: 100 };
    expect(SwipeUtils.isPanningPastCenter(pageBounds, viewportBounds)).toBe(false);
  });

});

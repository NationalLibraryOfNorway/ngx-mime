import { ViewerMode } from '../models/viewer-mode';
import { Point } from '../models/point';
import { Bounds } from '../models/bounds';
import { Direction } from '../models/direction';
import { ViewerOptions } from '../models/viewer-options';
import { SwipeUtils } from './swipe-utils';

describe('SwipeUtils ', () => {

  const swipeDirectionThreshold = ViewerOptions.pan.swipeDirectionThreshold;

  it('should return right when swiping in without threshold', () => {
    const start: Point = { x: 0, y: 50 };
    const end: Point = { x: 100, y: 50 };
    const direction = SwipeUtils.getSwipeDirection(start, end, false);
    expect(direction).toBe(Direction.RIGHT);
  });

  it('should return left when swiping without threshold', () => {
    const start: Point = { x: 100, y: 50 };
    const end: Point = { x: 0, y: 50 };
    const direction = SwipeUtils.getSwipeDirection(start, end, false);
    expect(direction).toBe(Direction.LEFT);
  });

  it('should return left when swiping with threshold', () => {
    const start: Point = { x: swipeDirectionThreshold + 1, y: 50 };
    const end: Point = { x: 0, y: 50 };
    const direction = SwipeUtils.getSwipeDirection(start, end, true);
    expect(direction).toBe(Direction.LEFT);
  });

  it('should return right when swiping with threshold', () => {
    const start: Point = { x: 0, y: 50 };
    const end: Point = { x: swipeDirectionThreshold + 1, y: 50 };
    const direction = SwipeUtils.getSwipeDirection(start, end, true);
    expect(direction).toBe(Direction.RIGHT);
  });

  it('should return undefined with threshold when deltaY is higher than deltaX (not implemented)', () => {
    const start: Point = { x: 0, y: 50 };
    const end: Point = { x: 0, y: 0 };
    const direction = SwipeUtils.getSwipeDirection(start, end, true);
    expect(direction).toBe(undefined);
  });

  it('should return true when panning outside right page-bounds', () => {
    const pageBounds: Bounds = { x: 0, y: 0, width: 200, height: 200 };
    // Pan outside right bounds
    const viewportBounds: Bounds = { x: 200, y: 0, width: 100, height: 100 };

    expect(SwipeUtils.isPanningOutsidePage(pageBounds, viewportBounds)).toBe(true);
  });

  it('should return true when panning outside left page-bounds', () => {
    const pageBounds: Bounds = { x: 100, y: 0, width: 200, height: 200 };
    // Pan outside left bounds
    const viewportBounds: Bounds = { x: 99, y: 0, width: 100, height: 100 };

    expect(SwipeUtils.isPanningOutsidePage(pageBounds, viewportBounds)).toBe(true);
  });

  it('should return false when not panning outside page-bounds', () => {
    const pageBounds: Bounds = { x: 0, y: 0, width: 200, height: 200 };
    // Panning inside bounds
    const viewportBounds: Bounds = { x: 60, y: 0, width: 100, height: 100 };

    expect(SwipeUtils.isPanningOutsidePage(pageBounds, viewportBounds)).toBe(false);
  });

});

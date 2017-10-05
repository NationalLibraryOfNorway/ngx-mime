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


  it('should return true when panning past center of page on the right side', () => {
    const pageBounds: Bounds = { x: 99, y: 0, width: 100, height: 100 };

    let center: Point = { x: 200, y: 0 };
    expect(SwipeUtils.isPanningPastCenter(pageBounds, center)).toBe(true);

  });

  it('should return true when panning past center of page on the left side', () => {
    let pageBounds: Bounds = { x: 0, y: 0, width: 100, height: 100 };
    let center: Point = { x: -51, y: 0 };

    expect(SwipeUtils.isPanningPastCenter(pageBounds, center)).toBe(true);

    pageBounds = { x: 100, y: 0, width: 100, height: 100 };
    center = { x: 50, y: 0 };

    expect(SwipeUtils.isPanningPastCenter(pageBounds, center)).toBe(true);
  });

  it('should return false when not panning past center of page', () => {
    const pageBounds: Bounds = { x: 100, y: 0, width: 100, height: 100 };

    // Not past center
    const center: Point = { x: 199, y: 0 };
    expect(SwipeUtils.isPanningPastCenter(pageBounds, center)).toBe(false);
  });

  it('should return true when direction is inside right semicircle', () => {
    let direction = Math.PI / 4;
    expect(SwipeUtils.isDirectionInRightSemicircle(direction)).toBe(true);

    direction = Math.PI / 8;
    expect(SwipeUtils.isDirectionInRightSemicircle(direction)).toBe(true);
  });

  it('should return false when direction is not inside right semicircle (equivalent to left semicircle)', () => {
    let direction = -Math.PI / 4;
    expect(SwipeUtils.isDirectionInRightSemicircle(direction)).toBe(false);

    direction = -Math.PI / 8;
    expect(SwipeUtils.isDirectionInRightSemicircle(direction)).toBe(false);
  });

});

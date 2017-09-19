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

  it('should be outside left page bounds', () => {
    let pageBounds = { x: 0, width: 200 }
    // Pan outside left bounds
    let viewportBounds = { x: 200, width: 100 }

    expect(SwipeUtils.isPanningOutsidePage(pageBounds, viewportBounds)).toBe(true);
  })

  it('should be outside right page bounds', () => {
    let pageBounds = { x: 100, width: 200 }
    // Pan outside right bounds
    let viewportBounds = { x: 99, width: 100 }

    expect(SwipeUtils.isPanningOutsidePage(pageBounds, viewportBounds)).toBe(true);
  })

});

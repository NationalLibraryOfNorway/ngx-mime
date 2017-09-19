import { SwipeUtils } from './swipe-utils';

describe('SwipeUtils ', () => {

  it('should return right', () => {
    const direction = new SwipeUtils().getSwipeDirection(0, 100);
    expect(direction).toBe('right');
  });

  it('should return left', () => {
    const direction = new SwipeUtils().getSwipeDirection(100, 0);
    expect(direction).toBe('left');
  });

});

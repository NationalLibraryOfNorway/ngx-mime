import { ArrayUtils } from './array-utils';

describe('ArrayUtils ', () => {

  it('should return closest index', () => {
    const array = [10, 20, 30, 40, 50, 60];
    const index = new ArrayUtils().findClosestIndex(array, 56);
    expect(index).toBe(5);
  });

});

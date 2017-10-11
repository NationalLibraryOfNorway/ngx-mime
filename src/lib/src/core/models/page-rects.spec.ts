import { PageRects } from './page-rects';

describe('CenterPoints ', () => {

  it('should return closest index', () => {
    const array = [10, 20, 30, 40, 50, 60];
    const centerPoints = new PageRects();
    centerPoints.add({ x: 10, y: 0 }, 0);
    centerPoints.add({ x: 20, y: 0 }, 1);
    centerPoints.add({ x: 30, y: 0 }, 2);
    centerPoints.add({ x: 40, y: 0 }, 3);
    centerPoints.add({ x: 50, y: 0 }, 4);
    centerPoints.add({ x: 60, y: 0 }, 5);

    const index = centerPoints.findClosestIndex({ x: 56, y: 0 });

    expect(index).toBe(5);
  });

});

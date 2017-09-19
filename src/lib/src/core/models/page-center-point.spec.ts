import { CenterPoints } from './page-center-point';

describe('CenterPoints ', () => {

  it('should return closest index', () => {
    const array = [10, 20, 30, 40, 50, 60];
    const centerPoints = new CenterPoints();
    centerPoints.add({ x: 10, y: 0 });
    centerPoints.add({ x: 20, y: 0 });
    centerPoints.add({ x: 30, y: 0 });
    centerPoints.add({ x: 40, y: 0 });
    centerPoints.add({ x: 50, y: 0 });
    centerPoints.add({ x: 60, y: 0 });

    const index = centerPoints.findClosestIndex({ x: 56, y: 0 });

    expect(index).toBe(5);
  });

});

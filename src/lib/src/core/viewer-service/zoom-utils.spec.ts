import { ZoomUtils } from './zoom-utils';
import { Point } from '../models/point';
import { Bounds } from '../models/bounds';


describe('ZoomUtils ', () => {

  it('should constrain position to pagebounds', () => {
    const page: Bounds = { x: 100, y: 100, width: 100, height: 100 };

    // Outside left side of page
    let pos: Point = { x: 50, y: 0 };

    let newPos = ZoomUtils.constrainPositionToPage(pos, page);
    expect(newPos.x).toBe(100);

    // Outside right side of page
    pos = { x: 210, y: 0 };
    newPos = ZoomUtils.constrainPositionToPage(pos, page);
    expect(newPos.x).toBe(200);
  });
});

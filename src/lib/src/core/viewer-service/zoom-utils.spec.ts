import { Rect } from '../models/rect';
import { ZoomUtils } from './zoom-utils';
import { Point } from '../models/point';

describe('ZoomUtils ', () => {

  it('should constrain position to pagebounds', () => {
    const page: Rect = { x: 100, y: 100, width: 100, height: 100 };

    // Outside left side of page
    let pos: Point = { x: 50, y: 0 };

    let newPos = ZoomUtils.constrainPositionToPage(pos, page);
    expect(newPos.x).toBe(100);

    // Outside right side of page
    pos = { x: 210, y: 0 };
    newPos = ZoomUtils.constrainPositionToPage(pos, page);
    expect(newPos.x).toBe(200);
  });

  it('should keep zoomFactor if it is lower than maxZoom', () => {
    const newFactor = ZoomUtils.constraintZoomFactor(2.0, 1, 4);
    expect(newFactor).toBe(2.0);
  });

  it('should constrain to maxZoom', () => {
    const newFactor = ZoomUtils.constraintZoomFactor(2.0, 1, 1.5);
    expect(newFactor).toBe(1.5);
  });

});

import { PageRects } from './page-rects';
import { ViewerLayout } from './viewer-layout';

describe('CenterPoints ', () => {

  it('should return closest index', () => {
    const tileRects = [];
    tileRects.push({ x: 10, y: 0 });
    tileRects.push({ x: 20, y: 0 });
    tileRects.push({ x: 30, y: 0 });
    tileRects.push({ x: 40, y: 0 });
    tileRects.push({ x: 50, y: 0 });
    tileRects.push({ x: 60, y: 0 });

    const pageRects = new PageRects(tileRects, ViewerLayout.ONE_PAGE, false);
    const index = pageRects.findClosestIndex({ x: 56, y: 0 });

    expect(index).toBe(5);
  });

});

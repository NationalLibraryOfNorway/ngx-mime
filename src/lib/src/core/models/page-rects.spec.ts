import { PageRects } from './page-rects';

describe('CenterPoints ', () => {

  it('should return closest index', () => {
    const pageRects = new PageRects();
    pageRects.add({ x: 10, y: 0 });
    pageRects.add({ x: 20, y: 0 });
    pageRects.add({ x: 30, y: 0 });
    pageRects.add({ x: 40, y: 0 });
    pageRects.add({ x: 50, y: 0 });
    pageRects.add({ x: 60, y: 0 });

    const index = pageRects.findClosestIndex({ x: 56, y: 0 });

    expect(index).toBe(5);
  });

});

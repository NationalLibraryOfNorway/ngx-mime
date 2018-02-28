import { CanvasGroups } from './page-rects';

describe('CanvasGroups', () => {
  it('should return closest index', () => {
    const canvasGroups = new CanvasGroups();
    canvasGroups.add({ x: 10, y: 0 });
    canvasGroups.add({ x: 20, y: 0 });
    canvasGroups.add({ x: 30, y: 0 });
    canvasGroups.add({ x: 40, y: 0 });
    canvasGroups.add({ x: 50, y: 0 });
    canvasGroups.add({ x: 60, y: 0 });

    const index = canvasGroups.findClosestIndex({ x: 56, y: 0 });

    expect(index).toBe(5);
  });
});

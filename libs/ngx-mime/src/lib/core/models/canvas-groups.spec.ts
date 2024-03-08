import { CanvasGroups } from './canvas-groups';
import { Rect } from './rect';

describe('CanvasGroups', () => {
  it('should return closest index', () => {
    const canvasGroups = new CanvasGroups();
    canvasGroups.add(new Rect({ x: 10, y: 0 }));
    canvasGroups.add(new Rect({ x: 20, y: 0 }));
    canvasGroups.add(new Rect({ x: 30, y: 0 }));
    canvasGroups.add(new Rect({ x: 40, y: 0 }));
    canvasGroups.add(new Rect({ x: 50, y: 0 }));
    canvasGroups.add(new Rect({ x: 60, y: 0 }));

    const index = canvasGroups.findClosestIndex({ x: 56, y: 0 });

    expect(index).toBe(5);
  });
});

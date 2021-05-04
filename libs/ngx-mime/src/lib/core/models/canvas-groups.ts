import { Point } from './point';
import { Rect } from './rect';

export class CanvasGroups {
  canvasGroupRects: Rect[] = [];
  canvasRects: Rect[] = [];
  canvasesPerCanvasGroup: number[][] = [];

  public add(rect: Rect): void {
    this.canvasGroupRects.push(rect);
  }

  public addRange(rects: Rect[]): void {
    this.canvasGroupRects = rects;
  }

  public get(index: number): Rect {
    return { ...this.canvasGroupRects[index] };
  }

  public findClosestIndex(point: Point): number {
    let i = 0;
    let lastDelta: any;

    if (point === null) {
      return -1;
    }
    this.canvasGroupRects.some(function(rect: Rect, index: number) {
      const delta = Math.abs(point.x - rect.centerX);
      if (delta >= lastDelta) {
        return true;
      }
      i = index;
      lastDelta = delta;
      return false;
    });
    return i;
  }

  public getMaxHeight(): number {
    return Math.max.apply(
      Math,
      this.canvasGroupRects.map(function(rect) {
        return rect.height;
      })
    );
  }

  public getMaxWidth(): number {
    return Math.max.apply(
      Math,
      this.canvasGroupRects.map(function(rect) {
        return rect.width;
      })
    );
  }

  public length(): number {
    return this.canvasGroupRects.length;
  }
}

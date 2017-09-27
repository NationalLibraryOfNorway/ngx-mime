import { Point } from './point';
import { Rect } from './rect';

export class TileRects {
  private tileRects: Rect[] = [];

  public add(rect: Rect): void {
    this.tileRects.push(rect);
  }

  public get(index: number): Rect {
    return { ...this.tileRects[index] };
  }

  public findClosestIndex(point: Point): number {
    let i: number;
    let result: any;
    let lastDelta: any;

    this.tileRects.some(function (rect: Rect, index: number) {
      const delta = Math.abs(point.x - rect.centerX);
      if (delta >= lastDelta) {
        return true;
      }
      i = index;
      result = rect;
      lastDelta = delta;
    });
    return i;
  }

  public getMaxHeight(): number {
    return Math.max.apply(Math, this.tileRects.map(function (rect) { return rect.height; }));
  }

  public getMaxWidth(): number {
    return Math.max.apply(Math, this.tileRects.map(function (rect) { return rect.width; }));
  }
}

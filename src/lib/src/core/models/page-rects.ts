import { Point } from './point';
import { Rect } from './rect';

export class PageRects {
  private pageRects: Rect[] = [];

  public add(rect: Rect): void {
    this.pageRects.push(rect);
  }

  public addRange(rects: Rect[]): void {
    this.pageRects = rects;
  }

  public get(index: number): Rect {
    return { ...this.pageRects[index] };
  }

  public findClosestIndex(point: Point): number {
    let i = 0;
    let lastDelta: any;

    if (point === null) {
      return -1;
    }
    this.pageRects.some(function (rect: Rect, index: number) {
      const delta = Math.abs(point.x - rect.centerX);
      if (delta >= lastDelta) {
        return true;
      }
      i = index;
      lastDelta = delta;
    });
    return i;
  }

  public getMaxHeight(): number {
    return Math.max.apply(Math, this.pageRects.map(function (rect) { return rect.height; }));
  }

  public getMaxWidth(): number {
    return Math.max.apply(Math, this.pageRects.map(function (rect) { return rect.width; }));
  }

  public length(): number {
    return this.pageRects.length;
  }
}

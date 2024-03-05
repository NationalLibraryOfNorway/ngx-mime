import {
  CanvasGroup,
  TileSourceAndRect,
} from '../canvas-service/tile-source-and-rect.model';
import { Point } from './point';

export class CanvasGroups {
  canvasGroupRects: CanvasGroup[] = [];
  canvasRects: TileSourceAndRect[] = [];
  canvasesPerCanvasGroup: number[][] = [];

  public add(rect: CanvasGroup): void {
    this.canvasGroupRects.push(rect);

    if (rect.canvases) {
      rect.canvases.forEach((rect: TileSourceAndRect, i: number) => {
        this.canvasRects.push(rect);
      });
    }
  }

  public addRange(rects: ReadonlyArray<CanvasGroup>): void {
    this.canvasGroupRects = [...rects];
  }

  public get(index: number): CanvasGroup {
    return { ...this.canvasGroupRects[index] };
  }

  public findClosestIndex(point: Point): number {
    let i = 0;
    let lastDelta: any;

    if (point === null) {
      return -1;
    }
    this.canvasGroupRects.some(function (rect: CanvasGroup, index: number) {
      const delta = Math.abs(point.x - rect.rect.centerX);
      if (delta >= lastDelta) {
        return true;
      }
      i = index;
      lastDelta = delta;
      return false;
    });
    return i;
  }

  public length(): number {
    return this.canvasGroupRects.length;
  }
}

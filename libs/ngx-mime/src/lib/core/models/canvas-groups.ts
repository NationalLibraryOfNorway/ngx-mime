import {
  CanvasGroup,
  TileSourceAndRect,
} from '../canvas-service/tile-source-and-rect.model';
import { Point } from './point';

export class CanvasGroups {
  canvasGroups: CanvasGroup[] = [];
  tileSourceAndRects: TileSourceAndRect[] = [];
  canvasesPerCanvasGroup: number[][] = [];

  public add(canvasGroup: CanvasGroup): void {
    this.canvasGroups.push(canvasGroup);

    if (canvasGroup.tileSourceAndRects) {
      canvasGroup.tileSourceAndRects.forEach(
        (tileSourceAndRect: TileSourceAndRect, i: number) => {
          this.tileSourceAndRects.push(tileSourceAndRect);
        },
      );
    }
  }

  public addRange(canvasGroups: ReadonlyArray<CanvasGroup>): void {
    this.canvasGroups = [...canvasGroups];
  }

  public get(index: number): CanvasGroup {
    return { ...this.canvasGroups[index] };
  }

  public findClosestIndex(point: Point): number {
    let i = 0;
    let lastDelta: any;

    if (point === null) {
      return -1;
    }
    this.canvasGroups.some(function (canvasGroup: CanvasGroup, index: number) {
      const delta = Math.abs(point.x - canvasGroup.rect.centerX);
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
    return this.canvasGroups.length;
  }
}

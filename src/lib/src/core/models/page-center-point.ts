import { ArrayUtils } from './../viewer-service/array-utils';
import { Point } from './point';

export class CenterPoints {
  private centerPoints: Point[] = [];

  public findClosestIndex(point: Point): number {
    return new ArrayUtils().findClosestIndex(this.centerPoints, point.x);
  }

  public add(point: Point): void  {
    this.centerPoints.push(point);
  }

  public get(index: number): Point {
    return this.centerPoints[index];
  }
}

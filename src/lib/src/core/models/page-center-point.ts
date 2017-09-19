import { Point } from './point';

export class CenterPoints {
  private centerPoints: Point[] = [];

  public add(point: Point): void {
    this.centerPoints.push(point);
  }

  public get(index: number): Point {
    return {...this.centerPoints[index]};
  }

  public update(index: number, point: Point): void {
    this.centerPoints[index] = point;
  }

  public findClosestIndex(point: Point): number {
    let i: number;
    let result: any;
    let lastDelta: any;

    this.centerPoints.some(function (item: Point, index: number) {
      const delta = Math.abs(point.x - item.x);
      if (delta >= lastDelta) {
        return true;
      }
      i = index;
      result = item;
      lastDelta = delta;
    });
    return i;
  }
}

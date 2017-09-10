import { Point } from './../models/point';

export class ArrayUtils {

  public findClosestIndex(array: Point[], value: number) {
    let i: number;
    let result: any;
    let lastDelta: any;

    array.some(function (item: Point, index: number) {
      const delta = Math.abs(value - item.x);
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

export class ArrayUtils {

  public findClosestIndex(array: any, value: any) {
    let i: number;
    let result: any;
    let lastDelta: any;

    array.some(function (item: any, index: number) {
      const delta = Math.abs(value - item);
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

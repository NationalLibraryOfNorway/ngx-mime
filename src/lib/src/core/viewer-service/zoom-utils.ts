import { Point } from '../models/point';
import { Bounds } from '../models/bounds';
export class ZoomUtils {
  /**
   *
   * @param {Point} in OSD-viewport-coordinates
   * @param {Bounds} pageBounds
   */
  static constrainPositionToPage(point: Point, pageBounds: Bounds): Point {
    if (point.x < pageBounds.x) {
      point.x = pageBounds.x;
    } else if (point.x > pageBounds.x + pageBounds.width) {
      point.x = pageBounds.x + pageBounds.width;
    }
    return point;
  }

}

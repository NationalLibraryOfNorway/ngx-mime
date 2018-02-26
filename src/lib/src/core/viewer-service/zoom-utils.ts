import { Rect } from '../models/rect';
import { Point } from '../models/point';
export class ZoomUtils {
  /**
   *
   * @param Point in OSD-viewport-coordinates
   * @param Rect pageBounds
   */
  static constrainPositionToPage(point: Point, pageBounds: Rect): Point {
    if (point.x < pageBounds.x) {
      point.x = pageBounds.x;
    } else if (point.x > pageBounds.x + pageBounds.width) {
      point.x = pageBounds.x + pageBounds.width;
    }
    return point;
  }

  static constraintZoomFactor(zoomFactor: number, currentZoom: number, maxZoom: number): number {
    const target = currentZoom * zoomFactor;
    return target > maxZoom ? maxZoom / target * zoomFactor : zoomFactor;
  }
}

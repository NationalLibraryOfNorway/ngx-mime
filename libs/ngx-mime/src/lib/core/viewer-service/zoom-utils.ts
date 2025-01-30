import { Rect } from '../models/rect';
import { Point } from '../models/point';

export class ZoomUtils {
  /**
   *
   * @param Point in OSD-viewport-coordinates
   * @param Rect canvasGroupBounds
   */
  static constrainPositionToCanvasGroup(
    point: Point,
    canvasGroupBounds: Rect,
  ): Point {
    if (point.x < canvasGroupBounds.x) {
      point.x = canvasGroupBounds.x;
    } else if (point.x > canvasGroupBounds.x + canvasGroupBounds.width) {
      point.x = canvasGroupBounds.x + canvasGroupBounds.width;
    }
    return point;
  }

  static constraintZoomFactor(
    zoomFactor: number,
    currentZoom: number,
    maxZoom: number,
  ): number {
    const target = currentZoom * zoomFactor;
    return target > maxZoom ? (maxZoom / target) * zoomFactor : zoomFactor;
  }
}

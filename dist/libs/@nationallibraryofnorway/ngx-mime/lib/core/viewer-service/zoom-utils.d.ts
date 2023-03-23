import { Rect } from '../models/rect';
import { Point } from '../models/point';
export declare class ZoomUtils {
    /**
     *
     * @param Point in OSD-viewport-coordinates
     * @param Rect canvasGroupBounds
     */
    static constrainPositionToCanvasGroup(point: Point, canvasGroupBounds: Rect): Point;
    static constraintZoomFactor(zoomFactor: number, currentZoom: number, maxZoom: number): number;
}

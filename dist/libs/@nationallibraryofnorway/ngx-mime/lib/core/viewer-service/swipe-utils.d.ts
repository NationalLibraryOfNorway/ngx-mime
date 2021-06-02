import { Rect } from '../models/rect';
import { Point } from '../models/point';
import { Side } from '../models/side';
import { Direction } from '../models/direction';
export declare class SwipeUtils {
    static getSwipeDirection(start: Point, end: Point, useThreshold?: boolean): Direction;
    static getSideIfPanningPastEndOfCanvasGroup(canvasGroupRect: Rect, vpBounds: Rect): Side | null;
    static isPanningOutsideCanvasGroup(canvasGroupRect: Rect, vpBounds: Rect): boolean;
    static isPanningOutsideLeft(canvasGroupRect: Rect, vpBounds: Rect): boolean;
    static isPanningOutsideRight(canvasGroupRect: Rect, vpBounds: Rect): boolean;
    /**
     *
     * @param direction Current computed direction, expressed as an
     * angle counterclockwise relative to the positive X axis (-pi to pi, in radians).
     * Only valid if speed > 0.
     */
    static isDirectionInRightSemicircle(direction: number): boolean;
    /**
     * @param direction @see isDirectionInRightSemicircle
     */
    static isDirectionInLeftSemicircle(direction: number): boolean;
}

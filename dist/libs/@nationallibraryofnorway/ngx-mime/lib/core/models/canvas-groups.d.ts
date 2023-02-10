import { Point } from './point';
import { Rect } from './rect';
export declare class CanvasGroups {
    canvasGroupRects: Rect[];
    canvasRects: Rect[];
    canvasesPerCanvasGroup: number[][];
    add(rect: Rect): void;
    addRange(rects: Rect[]): void;
    get(index: number): Rect;
    findClosestIndex(point: Point): number;
    length(): number;
}
//# sourceMappingURL=canvas-groups.d.ts.map
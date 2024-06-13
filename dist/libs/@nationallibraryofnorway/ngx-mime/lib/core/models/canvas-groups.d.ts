import { CanvasGroup, TileSourceAndRect } from '../canvas-service/tile-source-and-rect.model';
import { Point } from './point';
export declare class CanvasGroups {
    canvasGroups: CanvasGroup[];
    tileSourceAndRects: TileSourceAndRect[];
    canvasesPerCanvasGroup: number[][];
    add(canvasGroup: CanvasGroup): void;
    addRange(canvasGroups: ReadonlyArray<CanvasGroup>): void;
    get(index: number): CanvasGroup;
    findClosestIndex(point: Point): number;
    length(): number;
}

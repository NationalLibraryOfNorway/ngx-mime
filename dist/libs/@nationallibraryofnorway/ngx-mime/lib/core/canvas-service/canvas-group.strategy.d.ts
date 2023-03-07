import { Rect } from './../models/rect';
import { CanvasGroups } from './../models/canvas-groups';
export interface AbstractCanvasGroupStrategy {
    addAll(canvasRects: Rect[]): CanvasGroups;
}
export declare class OneCanvasPerCanvasGroupStrategy implements AbstractCanvasGroupStrategy {
    addAll: (canvasRects: Rect[]) => CanvasGroups;
}
export declare class TwoCanvasPerCanvasGroupStrategy implements AbstractCanvasGroupStrategy {
    addAll: (canvasRects: Rect[]) => CanvasGroups;
}
//# sourceMappingURL=canvas-group.strategy.d.ts.map
import { Rect } from './rect';
export declare class HighlightRect extends Rect {
    canvasIndex: number;
    constructor(fields?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        canvasIndex?: number;
    });
}

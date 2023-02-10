import { MimeViewerConfig } from '../mime-viewer-config';
import { Rect } from '../models/rect';
import { CalculateCanvasGroupPositionStrategy, CanvasGroupPositionCriteria } from './calculate-canvas-group-position-strategy';
export declare class OnePageCalculatePagePositionStrategy implements CalculateCanvasGroupPositionStrategy {
    private config;
    constructor(config: MimeViewerConfig);
    calculateCanvasGroupPosition(criteria: CanvasGroupPositionCriteria, rotation?: number): Rect;
    private calculateLtrX;
    private calculateRtlX;
}
//# sourceMappingURL=one-page-calculate-page-position-strategy.d.ts.map
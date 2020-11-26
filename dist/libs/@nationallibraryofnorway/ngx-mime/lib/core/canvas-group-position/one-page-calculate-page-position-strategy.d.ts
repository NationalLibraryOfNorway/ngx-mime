import { Rect } from '../models/rect';
import { CalculateCanvasGroupPositionStrategy, CanvasGroupPositionCriteria } from './calculate-canvas-group-position-strategy';
export declare class OnePageCalculatePagePositionStrategy implements CalculateCanvasGroupPositionStrategy {
    calculateCanvasGroupPosition(criteria: CanvasGroupPositionCriteria, rotation?: number): Rect;
    private calculateLtrX;
    private calculateRtlX;
}

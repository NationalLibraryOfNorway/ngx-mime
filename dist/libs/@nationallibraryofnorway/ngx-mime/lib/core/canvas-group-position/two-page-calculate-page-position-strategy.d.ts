import { Rect } from '../models/rect';
import { CalculateCanvasGroupPositionStrategy, CanvasGroupPositionCriteria } from './calculate-canvas-group-position-strategy';
export declare class TwoPageCalculateCanvasGroupPositionStrategy implements CalculateCanvasGroupPositionStrategy {
    calculateCanvasGroupPosition(criteria: CanvasGroupPositionCriteria, rotation?: number): Rect;
    private calculateEvenLtrX;
    private calculateOddLtrX;
    private calculateEvenRtlX;
    private calculateOddRtlX;
}

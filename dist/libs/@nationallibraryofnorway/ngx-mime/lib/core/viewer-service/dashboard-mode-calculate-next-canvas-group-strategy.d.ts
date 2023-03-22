import { CalculateNextCanvasGroupStrategy, NextCanvasGroupCriteria } from './calculate-next-canvas-group-strategy';
export declare class DashboardModeCalculateNextCanvasGroupStrategy implements CalculateNextCanvasGroupStrategy {
    calculateNextCanvasGroup(criteria: NextCanvasGroupCriteria): number;
    private calculateNumberOfCanvasGroupsToGo;
}

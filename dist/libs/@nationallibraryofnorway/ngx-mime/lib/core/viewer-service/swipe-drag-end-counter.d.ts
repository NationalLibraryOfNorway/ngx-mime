import { Direction } from '../models/direction';
import { Side } from '../models/side';
export declare class SwipeDragEndCounter {
    leftCount: number;
    rightCount: number;
    constructor();
    reset(): void;
    /**
     * @param direction of swipe / pan
     * @param side hit by swipe
     */
    addHit(side: Side | null, dir: Direction | null): void;
    hitCountReached(): boolean;
    private incrementSide;
    /**
     * Clear opposite side if swiping in the other direction
     * @param Direction of swipe / pan
     */
    private clearOppositeSideOfDragDirection;
}
//# sourceMappingURL=swipe-drag-end-counter.d.ts.map
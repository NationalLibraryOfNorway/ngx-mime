import { Direction } from '../models/direction';
import { Side } from '../models/side';
export class SwipeDragEndCounter {
  public leftCount = 0;
  public rightCount = 0;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.leftCount = 0;
    this.rightCount = 0;
  }

  /**
   * @param direction of swipe / pan
   * @param side hit by swipe
   */
  public addHit(side: Side | null, dir: Direction | null): void {
    if (side !== null) {
      this.incrementSide(side);
    }
    if (dir !== null) {
      this.clearOppositeSideOfDragDirection(dir);
    }
  }

  public hitCountReached(): boolean {
    return this.leftCount >= 2 || this.rightCount >= 2;
  }

  private incrementSide(side: Side): void {
    if (side === Side.LEFT) {
      this.leftCount++;
      this.rightCount = 0;
    } else if (side === Side.RIGHT) {
      this.rightCount++;
      this.leftCount = 0;
    }
  }

  /**
   * Clear opposite side if swiping in the other direction
   * @param Direction of swipe / pan
   */
  private clearOppositeSideOfDragDirection(dir: Direction): void {
    if (dir === Direction.LEFT) {
      this.leftCount = 0;
    } else if (dir === Direction.RIGHT) {
      this.rightCount = 0;
    }
  }
}

export class SwipeDragEndCounter {
  public leftCount: number;
  public rightCount: number;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.leftCount = 0;
    this.rightCount = 0;
  }

/**
 * @param dir Direction of swipe / pan
 * @param side Hit side
 */
  public addHit(side: string, dir: string): void {
    this.incrementSide(side);
    this.clearOppositeSideOfDragDirection(dir);
  }

  public hitCountReached(): boolean {
    return this.leftCount >= 2 || this.rightCount >= 2;
  }

  private incrementSide(side: string): void {
    if (side === 'left') {
      this.leftCount++;
      this.rightCount = 0;
    } else if (side === 'right') {
      this.rightCount++;
      this.leftCount = 0;
    }
  }

  /**
   * Clear opposite side if swiping in the other direction
   * @param dir Direction of swipe / pan
   */
  private clearOppositeSideOfDragDirection(dir: string): void {
    if (dir === 'left') {
      this.leftCount = 0;
    } else if (dir === 'right') {
      this.rightCount = 0;
    }
  }
}

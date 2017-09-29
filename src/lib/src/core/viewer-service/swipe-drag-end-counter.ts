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

  public addHit(side: string) {
    if (side === 'left') {
      this.leftCount++;
      this.rightCount = 0;
    } else if (side === 'right') {
      this.rightCount++;
      this.leftCount = 0;
    }
  }

  public hitCountReached(): boolean {
    return this.leftCount >= 2 || this.rightCount >= 2;
  }
}

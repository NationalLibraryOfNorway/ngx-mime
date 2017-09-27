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

  public resetIfCountIsReached(): void {
    if (this.leftCount >= 2 || this.rightCount >= 2) {
      this.reset();
    }
  }

  public addHit(side: string) {
    if (side === 'left') {
      this.leftCount++;
    } else if (side === 'right') {
      this.rightCount++;
    }
  }

  public shouldSwitchPage(): boolean {
    return this.leftCount >= 2 || this.rightCount >= 2;
  }


}

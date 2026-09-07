import { signal, Signal } from '@angular/core';

export class ContentSearchNavigationServiceStub {
  readonly currentHitCounter: Signal<number>;
  private readonly currentHitCounterState = signal(0);

  constructor() {
    this.currentHitCounter = this.currentHitCounterState.asReadonly();
  }

  setCurrentHitCounter(currentHitCounter: number): void {
    this.currentHitCounterState.set(currentHitCounter);
  }

  initialize(): void {}

  destroy(): void {}

  update(): void {}

  getHitOnActiveCanvasGroup(): boolean {
    return false;
  }

  goToNextHit(): void {}

  goToPreviousHit(): void {}
}

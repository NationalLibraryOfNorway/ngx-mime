import { signal, Signal } from '@angular/core';

export class ViewerServiceStub {
  readonly currentCanvasGroupIndex: Signal<number>;
  private readonly currentCanvasGroupIndexState = signal(0);

  constructor() {
    this.currentCanvasGroupIndex =
      this.currentCanvasGroupIndexState.asReadonly();
  }

  setCanvasGroupIndexChange(canvasIndex: number) {
    this.currentCanvasGroupIndexState.set(canvasIndex);
  }

  public goToPreviousCanvasGroup(): void {}

  public goToNextCanvasGroup(): void {}

  public goToCanvas(index: number): void {
    this.setCanvasGroupIndexChange(index);
  }

  zoomIn(): void {}
}

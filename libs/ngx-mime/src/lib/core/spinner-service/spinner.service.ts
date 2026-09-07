import { Injectable, signal, Signal } from '@angular/core';

@Injectable()
export class SpinnerService {
  readonly visible: Signal<boolean>;
  private readonly visibleState = signal(false);

  constructor() {
    this.visible = this.visibleState.asReadonly();
  }

  show() {
    this.visibleState.set(true);
  }

  hide() {
    this.visibleState.set(false);
  }
}

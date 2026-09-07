import { signal } from '@angular/core';

export class FullscreenServiceStub {
  readonly isFullscreen = signal(false).asReadonly();

  isEnabled(): boolean {
    return true;
  }
}

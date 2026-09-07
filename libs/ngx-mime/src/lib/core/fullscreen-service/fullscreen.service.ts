import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, Injectable, signal, Signal } from '@angular/core';

@Injectable()
export class FullscreenService {
  readonly isFullscreen: Signal<boolean>;
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fullscreenState = signal(this.getFullscreenState());

  constructor() {
    this.isFullscreen = this.fullscreenState.asReadonly();
    this.listenForFullscreenChanges();
  }

  isEnabled(): boolean {
    const document = this.document as any;

    return Boolean(
      document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled,
    );
  }

  toggle(element: HTMLElement): void {
    this.isFullscreen() ? this.closeFullscreen() : this.openFullscreen(element);
  }

  private listenForFullscreenChanges(): void {
    const eventName = this.getFullscreenChangeEventName();
    if (!eventName) {
      return;
    }
    const handleFullscreenChange = () => {
      this.fullscreenState.set(this.getFullscreenState());
    };
    this.document.addEventListener(eventName, handleFullscreenChange);
    this.destroyRef.onDestroy(() =>
      this.document.removeEventListener(eventName, handleFullscreenChange),
    );
  }

  private getFullscreenChangeEventName(): string | undefined {
    const document = this.document as any;
    if (document.fullscreenEnabled) {
      return 'fullscreenchange';
    }
    if (document.webkitFullscreenEnabled) {
      return 'webkitfullscreenchange';
    }
    if (document.mozFullScreenEnabled) {
      return 'mozfullscreenchange';
    }
    if (document.msFullscreenEnabled) {
      return 'msfullscreenchange';
    }

    return undefined;
  }

  private getFullscreenState(): boolean {
    const document = this.document as any;

    return Boolean(
      document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement,
    );
  }

  private openFullscreen(element: any): void {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  private closeFullscreen(): void {
    const document = this.document as any;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

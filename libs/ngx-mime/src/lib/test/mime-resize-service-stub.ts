import { ElementRef, Injectable, signal } from '@angular/core';
import { Dimensions } from '../core/models/dimensions';

@Injectable()
export class MimeResizeServiceStub {
  readonly dimensions = signal<Dimensions | null>(null);
  private _el!: ElementRef;

  get el() {
    return this._el;
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  initialize(): void {
    this.triggerResize();
  }

  destroy(): void {}

  triggerResize(dimensions?: DOMRectReadOnly): void {
    if (dimensions) {
      this.dimensions.set(new Dimensions(dimensions));
    } else {
      this.dimensions.set(new Dimensions());
    }
  }
}

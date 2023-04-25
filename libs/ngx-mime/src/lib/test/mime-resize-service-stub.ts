import { ElementRef, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Dimensions } from '../core/models/dimensions';

@Injectable()
export class MimeResizeServiceStub {
  private _el!: ElementRef;
  private resizeSubject: ReplaySubject<Dimensions> = new ReplaySubject();

  get onResize(): Observable<Dimensions> {
    return this.resizeSubject.asObservable();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  get el() {
    return this._el;
  }

  initialize(): void {
    this.triggerResize();
  }

  destroy(): void {}

  triggerResize(dimensions?: DOMRectReadOnly): void {
    if (dimensions) {
      this.resizeSubject.next(dimensions);
    } else {
      this.resizeSubject.next(new DOMRectReadOnly());
    }
  }
}

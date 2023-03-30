import { ElementRef, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Dimensions } from '../core/models/dimensions';

@Injectable()
export class MimeResizeServiceStub {
  private _el!: ElementRef;
  private resizeSubject: ReplaySubject<Dimensions> = new ReplaySubject();

  get onResize(): Observable<Dimensions> {
    console.log('YO');

    return this.resizeSubject.asObservable();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  get el() {
    return this._el;
  }

  initialize(): void {
    console.log('init');
    this.triggerResize();
  }

  destroy(): void {}

  triggerResize(dimensions?: DOMRectReadOnly): void {
    console.log('YO!!!');
    if (dimensions) {
      this.resizeSubject.next(dimensions);
    } else {
      this.resizeSubject.next(new DOMRectReadOnly());
    }
  }
}

import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Rect } from './../core/models/rect';

@Injectable()
export class AttributionDialogResizeService {
  private _el: ElementRef;
  private resizeSubject: ReplaySubject<Rect> = new ReplaySubject();
  private rect: Rect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
  };

  constructor() { }

  set el(el: ElementRef) {
    this._el = el;
  }

  get el() {
    return this._el;
  }

  get onResize(): Observable<Rect> {
    return this.resizeSubject.asObservable();
  }

  markForCheck() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    if (this.rect.bottom !== rect.bottom ||
      this.rect.height !== rect.height ||
      this.rect.left !== rect.left ||
      this.rect.right !== rect.right ||
      this.rect.top !== rect.top ||
      this.rect.width !== rect.width) {
      this.rect = {
        bottom: rect.bottom,
        height: rect.height,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        width: rect.width
      };
      this.resizeSubject.next({...this.rect});
    }
  }
}

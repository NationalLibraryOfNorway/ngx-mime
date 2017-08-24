import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export interface Rect {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
}

@Injectable()
export class MimeResizeService {
  private _el: ElementRef;
  private resizeSubject: ReplaySubject<Rect> = new ReplaySubject();
  private viewerRect: Rect = {
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

    if (this.viewerRect.bottom !== rect.bottom ||
      this.viewerRect.height !== rect.height ||
      this.viewerRect.left !== rect.left ||
      this.viewerRect.right !== rect.right ||
      this.viewerRect.top !== rect.top ||
      this.viewerRect.width !== rect.width) {
      this.viewerRect = {
        bottom: rect.bottom,
        height: rect.height,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        width: rect.width
      };
      this.resizeSubject.next({...this.viewerRect});
    }

  }
}

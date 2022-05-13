import { ElementRef, Injectable } from '@angular/core';
import { debounceTime, map, Observable, ReplaySubject } from 'rxjs';
import { Dimensions } from '../models/dimensions';

@Injectable()
export class MimeResizeService {
  private _el!: ElementRef;
  private resizeSubject: ReplaySubject<DOMRectReadOnly> = new ReplaySubject();

  constructor() {}

  set el(el: ElementRef) {
    this._el = el;
  }

  get el() {
    return this._el;
  }

  get onResize(): Observable<Dimensions> {
    return this.resizeSubject.pipe(
      debounceTime(200),
      map((contentRect: DOMRectReadOnly) => {
        return {
          bottom: contentRect.bottom,
          height: contentRect.height,
          left: contentRect.left,
          right: contentRect.right,
          top: contentRect.top,
          width: contentRect.width,
        };
      })
    );
  }

  initialize() {
    const observer = new ResizeObserver((entry) => {
      this.resizeSubject.next(entry[0].contentRect);
    });
    const el = <any>this.el.nativeElement.querySelector('#ngx-mime-mimeViewer');
    observer.observe(el);
  }
}

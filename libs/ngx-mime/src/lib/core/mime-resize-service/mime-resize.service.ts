import { ElementRef, Injectable } from '@angular/core';
import { debounceTime, map, Observable, ReplaySubject } from 'rxjs';
import { Dimensions } from '../models/dimensions';
import { ViewerService } from '../viewer-service/viewer.service';

@Injectable()
export class MimeResizeService {
  private _el!: ElementRef;
  private resizeSubject: ReplaySubject<DOMRectReadOnly> = new ReplaySubject();
  private observer!: ResizeObserver;

  constructor(private viewerService: ViewerService) {}

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
    this.observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.resizeSubject.next(entry.contentRect);
      }
    });

    const el: Element = this.el.nativeElement.querySelector(
      `#${this.viewerService.id}`
    );

    this.observer.observe(el);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

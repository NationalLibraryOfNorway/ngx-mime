import { ElementRef, inject, Injectable } from '@angular/core';
import { debounceTime, map, Observable, ReplaySubject } from 'rxjs';
import { Dimensions } from '../models/dimensions';
import { ViewerService } from '../viewer-service/viewer.service';

@Injectable()
export class MimeResizeService {
  private readonly viewerService = inject(ViewerService);
  private _el!: ElementRef;
  private readonly resizeSubject: ReplaySubject<DOMRectReadOnly> =
    new ReplaySubject();
  private observer!: ResizeObserver;

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
      }),
    );
  }

  get el() {
    return this._el;
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  initialize() {
    if (this.isResizeObserverSupported()) {
      this.initializeResizeObserver();
    }
  }

  destroy() {
    this.observer?.disconnect();
  }

  private isResizeObserverSupported(): boolean {
    return 'ResizeObserver' in window;
  }

  private initializeResizeObserver(): void {
    this.observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        this.handleResizeEntry(entry);
      }
    });

    const el: Element | null = this.el.nativeElement.querySelector(
      `#${this.viewerService.id}`,
    );

    if (el) {
      this.observer?.observe(el);
    }
  }

  private handleResizeEntry(entry: ResizeObserverEntry): void {
    this.resizeSubject.next(entry.contentRect);
  }
}

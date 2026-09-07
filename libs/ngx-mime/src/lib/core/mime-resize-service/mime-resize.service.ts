import { ElementRef, inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, map, Subject } from 'rxjs';
import { Dimensions } from '../models/dimensions';
import { ViewerService } from '../viewer-service/viewer.service';

@Injectable()
export class MimeResizeService {
  readonly dimensions: Signal<Dimensions | null>;
  private readonly viewerService = inject(ViewerService);
  private _el!: ElementRef;
  private readonly resizeSubject = new Subject<DOMRectReadOnly>();
  private observer!: ResizeObserver;

  constructor() {
    this.dimensions = toSignal(
      this.resizeSubject.pipe(
        debounceTime(200),
        map(
          ({ bottom, height, left, right, top, width }) =>
            new Dimensions({ bottom, height, left, right, top, width }),
        ),
      ),
      { initialValue: null },
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

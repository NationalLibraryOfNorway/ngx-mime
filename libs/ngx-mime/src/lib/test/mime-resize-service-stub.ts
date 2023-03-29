import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Dimensions } from '../core/models/dimensions';

@Injectable()
export class MimeResizeServiceStub {
  private resizeSubject: ReplaySubject<Dimensions> = new ReplaySubject();

  get onResize(): Observable<Dimensions> {
    return this.resizeSubject.asObservable();
  }

  initialize(): void {
    this.triggerResize();
  }

  destroy(): void {}

  triggerResize(dimensions?: DOMRectReadOnly): void {

    if (dimensions) {
      this.resizeSubject.next(dimensions);
    } else {
      console.log('triggerResize', dimensions);
      this.resizeSubject.next(new DOMRectReadOnly());
    }
  }
}

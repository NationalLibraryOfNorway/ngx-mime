import { Injectable, ElementRef } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { MimeDomHelper } from '../mime-dom-helper';
import { Dimensions } from '../models/dimensions';

@Injectable()
export class MimeResizeService {
  private _el!: ElementRef;
  private resizeSubject: ReplaySubject<Dimensions> = new ReplaySubject();
  private dimensions = new Dimensions();

  constructor(private mimeDomHelper: MimeDomHelper) {}

  set el(el: ElementRef) {
    this._el = el;
  }

  get el() {
    return this._el;
  }

  get onResize(): Observable<Dimensions> {
    return this.resizeSubject.asObservable();
  }

  markForCheck(): void {
    if (!this.el) {
      throw new Error('No element!');
    }
    const dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);

    if (
      this.dimensions.bottom !== dimensions.bottom ||
      this.dimensions.height !== dimensions.height ||
      this.dimensions.left !== dimensions.left ||
      this.dimensions.right !== dimensions.right ||
      this.dimensions.top !== dimensions.top ||
      this.dimensions.width !== dimensions.width
    ) {
      this.dimensions = dimensions;
      this.resizeSubject.next({ ...this.dimensions });
    }
  }
}

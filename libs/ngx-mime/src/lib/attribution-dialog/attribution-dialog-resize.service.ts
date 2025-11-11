import { ElementRef, inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { MimeDomHelper } from './../core/mime-dom-helper';
import { Dimensions } from './../core/models/dimensions';

@Injectable({providedIn: 'root'})
export class AttributionDialogResizeService {
  private readonly mimeDomHelper = inject(MimeDomHelper);
  private _el: ElementRef | null = null;
  private readonly resizeSubject: ReplaySubject<Dimensions> =
    new ReplaySubject();
  private dimensions = new Dimensions();

  get onResize(): Observable<Dimensions> {
    return this.resizeSubject.asObservable();
  }

  get el(): ElementRef | null {
    return this._el;
  }

  set el(el: ElementRef | null) {
    this._el = el;
  }

  markForCheck() {
    if (this.el) {
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
}

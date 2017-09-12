import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export interface SpinnerState {
  show: boolean;
}

@Injectable()
export class SpinnerService {
  private spinnerSubject = new Subject<SpinnerState>();

  spinnerState = this.spinnerSubject.asObservable();

  constructor(@Optional() @SkipSelf() prior: SpinnerService) {
    if (prior) { return prior; }
    console.log('created spinner service');
  }

  show() {
    this.spinnerSubject.next(<SpinnerState>{ show: true });
  }

  hide() {
    this.spinnerSubject.next(<SpinnerState>{ show: false });
  }
}

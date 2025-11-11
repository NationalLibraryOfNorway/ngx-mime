import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface SpinnerState {
  show: boolean;
}

@Injectable({providedIn: 'root'})
export class SpinnerService {
  private readonly spinnerSubject = new Subject<SpinnerState>();

  get spinnerState(): Observable<SpinnerState> {
    return this.spinnerSubject.asObservable();
  }

  show() {
    this.spinnerSubject.next(<SpinnerState>{ show: true });
  }

  hide() {
    this.spinnerSubject.next(<SpinnerState>{ show: false });
  }
}

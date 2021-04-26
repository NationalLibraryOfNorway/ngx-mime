import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ModeChanges } from '../models/modeChanges';
import { ViewerMode } from '../models/viewer-mode';

@Injectable()
export class ModeService {
  private _initialMode: ViewerMode;
  private _mode: ViewerMode;
  private toggleModeSubject: BehaviorSubject<ModeChanges>;
  private modeChanges = new ModeChanges();

  constructor() {
    this.toggleModeSubject = new BehaviorSubject(new ModeChanges());
  }

  get onChange(): Observable<ModeChanges> {
    return this.toggleModeSubject.asObservable().pipe(distinctUntilChanged());
  }

  set mode(mode: ViewerMode) {
    this._mode = mode;
    this.change();
  }

  get mode(): ViewerMode {
    return this._mode;
  }

  set initialMode(mode: ViewerMode) {
    this._initialMode = mode;
    this.mode = mode;
  }

  get initialMode(): ViewerMode {
    return this._initialMode;
  }

  toggleMode(): void {
    if (this.mode === ViewerMode.DASHBOARD) {
      this.mode = ViewerMode.PAGE;
    } else if (
      this.mode === ViewerMode.PAGE ||
      this.mode === ViewerMode.PAGE_ZOOMED
    ) {
      this.mode = ViewerMode.DASHBOARD;
    }
  }

  private change() {
    this.modeChanges.previousValue = this.modeChanges.currentValue;
    this.modeChanges.currentValue = this._mode;
    this.toggleModeSubject.next({
      ...this.modeChanges,
    });
  }
}

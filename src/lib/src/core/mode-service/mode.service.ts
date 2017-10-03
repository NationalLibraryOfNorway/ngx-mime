import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

import { ViewerMode } from '../models/viewer-mode';

export class ModeService {
  private _initialMode: ViewerMode;
  private _mode: ViewerMode;
  private toggleModeSubject: ReplaySubject<ViewerMode> = new ReplaySubject();

  constructor(
  ) { }

  get onChange(): Observable<ViewerMode> {
    return this.toggleModeSubject.asObservable().distinctUntilChanged();
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
    this._mode = mode;
    this.change();
  }

  get initialMode(): ViewerMode {
    return this._initialMode;
  }

  toggleMode(): void {
    if (this.mode === ViewerMode.DASHBOARD) {
      this.mode = ViewerMode.PAGE;
    } else if (this.mode === ViewerMode.PAGE || this.mode === ViewerMode.PAGE_ZOOMED) {
      this.mode = ViewerMode.DASHBOARD;
    }
  }

  private change() {
    this.toggleModeSubject.next(this._mode);
  }
}

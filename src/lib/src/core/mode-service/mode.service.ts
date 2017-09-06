import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { ViewerMode } from '../models/viewer-mode';

export class ModeService {
  private _mode: ViewerMode;
  private toggleModeSubject: ReplaySubject<ViewerMode> = new ReplaySubject();

  constructor() { }

  get onChange(): Observable<ViewerMode> {
    return this.toggleModeSubject.asObservable();
  }

  set mode(mode: ViewerMode) {
    this._mode = mode;
    this.change();
  }

  get mode(): ViewerMode {
    return this._mode;
  }

  toggleMode(): void {
    if (this.mode === ViewerMode.DASHBOARD) {
      this.mode = ViewerMode.PAGE;
    } else if (this.mode === ViewerMode.PAGE) {
      this.mode = ViewerMode.DASHBOARD;
    }
    //this.change();
  }

  private change() {
    this.toggleModeSubject.next(this._mode);
  }
}

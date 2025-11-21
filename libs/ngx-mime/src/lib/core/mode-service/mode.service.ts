import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ModeChanges, ViewerMode } from '../models';

@Injectable()
export class ModeService {
  private config!: MimeViewerConfig;
  private _mode!: ViewerMode;
  private readonly toggleModeSubject: BehaviorSubject<ModeChanges>;
  private readonly modeChanges = new ModeChanges();

  constructor() {
    this.toggleModeSubject = new BehaviorSubject(new ModeChanges());
  }

  get onChange(): Observable<ModeChanges> {
    return this.toggleModeSubject.asObservable().pipe(distinctUntilChanged());
  }

  get mode(): ViewerMode {
    return this._mode;
  }

  set mode(mode: ViewerMode) {
    this._mode = mode;
    this.change();
  }

  initialize(): void {
    this.mode = this.config?.initViewerMode;
  }

  destroy() {
    this.mode = this.config?.initViewerMode;
  }

  setConfig(config: MimeViewerConfig) {
    this.config = config;
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

  isPageZoomed(): boolean {
    return this.mode === ViewerMode.PAGE_ZOOMED;
  }

  private change() {
    this.modeChanges.previousValue = this.modeChanges.currentValue;
    this.modeChanges.currentValue = this._mode;
    this.toggleModeSubject.next({
      ...this.modeChanges,
    });
  }
}

import { computed, Injectable, signal, Signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ModeChanges, ViewerMode } from '../models';

@Injectable()
export class ModeService {
  readonly mode: Signal<ViewerMode>;
  readonly modeChange: Signal<ModeChanges>;
  readonly isPageZoomed: Signal<boolean>;
  readonly onChange: Observable<ModeChanges>;
  private config = new MimeViewerConfig();
  private readonly modeChangeState = signal<ModeChanges>({
    currentValue: this.config.initViewerMode,
    previousValue: undefined,
  });
  private readonly modeChangesSubject = new Subject<ModeChanges>();

  constructor() {
    this.modeChange = this.modeChangeState.asReadonly();
    this.mode = computed(
      () => this.modeChange().currentValue ?? this.config.initViewerMode,
    );
    this.isPageZoomed = computed(() => this.mode() === ViewerMode.PAGE_ZOOMED);
    this.onChange = this.modeChangesSubject.asObservable();
  }

  initialize(): void {
    this.setMode(this.config.initViewerMode);
  }

  destroy() {
    this.setMode(this.config.initViewerMode);
  }

  setConfig(config: MimeViewerConfig) {
    this.config = config;
  }

  setMode(mode: ViewerMode): void {
    const modeChange = {
      currentValue: mode,
      previousValue: this.mode(),
    };
    this.modeChangeState.set(modeChange);
    this.modeChangesSubject.next(modeChange);
  }

  toggleMode(): void {
    if (this.mode() === ViewerMode.DASHBOARD) {
      this.setMode(ViewerMode.PAGE);
    } else if (
      this.mode() === ViewerMode.PAGE ||
      this.mode() === ViewerMode.PAGE_ZOOMED
    ) {
      this.setMode(ViewerMode.DASHBOARD);
    }
  }
}

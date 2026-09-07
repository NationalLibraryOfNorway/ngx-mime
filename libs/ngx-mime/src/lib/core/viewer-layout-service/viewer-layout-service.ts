import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';

@Injectable()
export class ViewerLayoutService {
  readonly viewerLayout: Signal<ViewerLayout>;
  readonly onChange: Observable<ViewerLayout>;
  readonly isHandsetOrTabletInPortrait: Signal<boolean>;
  readonly isWeb: Signal<boolean>;
  readonly isXSmall: Signal<boolean>;
  private readonly breakpointObserver = inject(BreakpointObserver);
  private config = new MimeViewerConfig();
  private readonly viewerLayoutState = signal(this.config.initViewerLayout);

  constructor() {
    this.viewerLayout = this.viewerLayoutState.asReadonly();
    this.onChange = toObservable(this.viewerLayout);
    this.isHandsetOrTabletInPortrait = toSignal(
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
        .pipe(map(({ matches }) => matches)),
      { initialValue: false },
    );
    this.isWeb = toSignal(
      this.breakpointObserver
        .observe([Breakpoints.Web])
        .pipe(map(({ matches }) => matches)),
      { initialValue: false },
    );
    this.isXSmall = toSignal(
      this.breakpointObserver
        .observe([Breakpoints.XSmall])
        .pipe(map(({ matches }) => matches)),
      { initialValue: false },
    );
  }

  get layout(): ViewerLayout {
    return this.viewerLayout();
  }

  init(isPagedManifest?: boolean): void {
    if (
      this.config.initViewerLayout === ViewerLayout.TWO_PAGE &&
      isPagedManifest &&
      !this.isHandsetOrTabletInPortrait()
    ) {
      this.setLayout(ViewerLayout.TWO_PAGE);
    } else {
      this.setLayout(ViewerLayout.ONE_PAGE);
    }
  }

  setConfig(config: MimeViewerConfig) {
    this.config = config;
  }

  setLayout(viewerLayout: ViewerLayout) {
    this.viewerLayoutState.set(viewerLayout);
  }

  toggle() {
    if (this.viewerLayout() === ViewerLayout.TWO_PAGE) {
      this.setLayout(ViewerLayout.ONE_PAGE);
    } else if (this.viewerLayout() === ViewerLayout.ONE_PAGE) {
      this.setLayout(ViewerLayout.TWO_PAGE);
    }
  }
}

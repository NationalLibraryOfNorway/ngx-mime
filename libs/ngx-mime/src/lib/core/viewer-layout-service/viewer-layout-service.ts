import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';

@Injectable()
export class ViewerLayoutService {
  private breakpointObserver = inject(BreakpointObserver);
  private config = new MimeViewerConfig();
  private _layout!: ViewerLayout;
  private subject: BehaviorSubject<ViewerLayout> =
    new BehaviorSubject<ViewerLayout>(this.config.initViewerLayout);

  init(isPagedManifest?: boolean): void {
    if (
      this.config.initViewerLayout === ViewerLayout.TWO_PAGE &&
      isPagedManifest &&
      !this.isHandsetOrTabletInPortrait()
    ) {
      this._layout = ViewerLayout.TWO_PAGE;
      this.change();
    } else {
      this._layout = ViewerLayout.ONE_PAGE;
      this.change();
    }
  }

  get onChange(): Observable<ViewerLayout> {
    return this.subject.asObservable().pipe(distinctUntilChanged());
  }

  get layout(): ViewerLayout {
    return this._layout;
  }

  setConfig(config: MimeViewerConfig) {
    this.config = config;
  }

  setLayout(viewerLayout: ViewerLayout) {
    this._layout = viewerLayout;
    this.change();
  }

  toggle() {
    if (this._layout === ViewerLayout.TWO_PAGE) {
      this.setLayout(ViewerLayout.ONE_PAGE);
    } else if (this._layout === ViewerLayout.ONE_PAGE) {
      this.setLayout(ViewerLayout.TWO_PAGE);
    }
  }

  private change() {
    this.subject.next(this._layout);
  }

  private isHandsetOrTabletInPortrait(): boolean {
    return this.breakpointObserver.isMatched([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait,
    ]);
  }
}

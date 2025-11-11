import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';

@Injectable({ providedIn: 'root' })
export class ViewerLayoutService {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private config = new MimeViewerConfig();
  private _layout!: ViewerLayout;
  private readonly subject: BehaviorSubject<ViewerLayout> =
    new BehaviorSubject<ViewerLayout>(this.config.initViewerLayout);

  get onChange(): Observable<ViewerLayout> {
    return this.subject.asObservable().pipe(distinctUntilChanged());
  }

  get layout(): ViewerLayout {
    return this._layout;
  }

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

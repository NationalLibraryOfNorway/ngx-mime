import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';

@Injectable()
export class ViewerLayoutService {
  private mimeConfig = new MimeViewerConfig();
  private _layout: ViewerLayout;
  private subject: BehaviorSubject<ViewerLayout> = new BehaviorSubject<
    ViewerLayout
  >(this.mimeConfig.initViewerLayout);
  constructor(private mediaObserver: MediaObserver) {}

  init(isPagedManifest?: boolean): void {
    if (
      this.mimeConfig.initViewerLayout === ViewerLayout.TWO_PAGE &&
      isPagedManifest &&
      !this.isMobile()
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

  setLayout(viewerLayout: ViewerLayout) {
    this._layout = viewerLayout;
    this.change();
  }

  private change() {
    this.subject.next(this._layout);
  }

  private isMobile(): boolean {
    return this.mediaObserver.isActive('lt-md');
  }
}

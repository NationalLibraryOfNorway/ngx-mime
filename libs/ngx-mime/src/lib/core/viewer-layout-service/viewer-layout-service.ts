import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';

@Injectable({
  providedIn: 'root',
})
export class ViewerLayoutService {
  private mimeConfig = new MimeViewerConfig();
  private _layout!: ViewerLayout;
  private subject: BehaviorSubject<ViewerLayout> =
    new BehaviorSubject<ViewerLayout>(this.mimeConfig.initViewerLayout);
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

  private isMobile(): boolean {
    return this.mediaObserver.isActive('lt-md');
  }
}

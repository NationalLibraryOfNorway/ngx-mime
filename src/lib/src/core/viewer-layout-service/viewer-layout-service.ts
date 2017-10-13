

import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';
import { Manifest } from '../models/manifest';

@Injectable()
export class ViewerLayoutService {
  private mimeConfig = new MimeViewerConfig();
  private viewerLayoutSubject: Subject<ViewerLayout> = new Subject<ViewerLayout>();
  public viewerLayoutState = this.viewerLayoutSubject.asObservable();
  public isPagedManifest = false;

  constructor() { }

  init(manifest: Manifest) {
    this.isPagedManifest = manifest && manifest.sequences && manifest.sequences[0].viewingHint === 'paged';
    if (this.isPagedManifest && this.mimeConfig.initViewerLayout === ViewerLayout.TWO_PAGE) {
      this.viewerLayoutSubject.next(ViewerLayout.TWO_PAGE);
    } else {
      this.viewerLayoutSubject.next(ViewerLayout.ONE_PAGE);
    }
  }

  setLayout(viewerLayout: ViewerLayout) {
    this.viewerLayoutSubject.next(viewerLayout);
  }

}

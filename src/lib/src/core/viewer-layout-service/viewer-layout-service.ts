import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';
import { Manifest } from '../models/manifest';
import { ManifestUtils } from '../iiif-manifest-service/iiif-manifest-utils';

@Injectable()
export class ViewerLayoutService {
  private mimeConfig = new MimeViewerConfig();
  private viewerLayoutSubject: Subject<ViewerLayout> = new Subject<ViewerLayout>();
  public viewerLayoutState = this.viewerLayoutSubject.asObservable();
  constructor() { }

  init(manifest: Manifest) {
    const isPagedManifest = ManifestUtils.isManifestPaged(manifest);
    if (isPagedManifest && this.mimeConfig.initViewerLayout === ViewerLayout.TWO_PAGE) {
      this.viewerLayoutSubject.next(ViewerLayout.TWO_PAGE);
    } else {
      this.viewerLayoutSubject.next(ViewerLayout.ONE_PAGE);
    }
  }

  setLayout(viewerLayout: ViewerLayout) {
    this.viewerLayoutSubject.next(viewerLayout);
  }

}

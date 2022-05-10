import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AltoService } from '../core/alto-service/alto.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ManifestUtils } from '../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeViewerIntl } from '../core/intl';
import { RecognizedTextMode } from '../core/models';
import { Manifest } from '../core/models/manifest';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerOptions } from '../core/models/viewer-options';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';

@Component({
  selector: 'mime-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss'],
})
export class ViewDialogComponent implements OnInit, OnDestroy {
  viewerLayout: ViewerLayout = ViewerLayout.ONE_PAGE;
  ViewerLayout: typeof ViewerLayout = ViewerLayout;
  isPagedManifest = false;
  hasRecognizedTextContent = false;
  recognizedTextMode = RecognizedTextMode.NONE;
  RecognizedTextMode: typeof RecognizedTextMode = RecognizedTextMode;
  private subscriptions = new Subscription();

  constructor(
    public mediaObserver: MediaObserver,
    public intl: MimeViewerIntl,
    private viewerLayoutService: ViewerLayoutService,
    private iiifManifestService: IiifManifestService,
    private altoService: AltoService,
    private viewerService: ViewerService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.viewerLayoutService.onChange.subscribe(
        (viewerLayout: ViewerLayout) => {
          this.viewerLayout = viewerLayout;
        }
      )
    );
    this.subscriptions.add(
      this.altoService.onRecognizedTextContentModeChange$.subscribe(
        (recognizedTextMode: RecognizedTextMode) => {
          this.recognizedTextMode = recognizedTextMode;
        }
      )
    );
    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.isPagedManifest = manifest
            ? ManifestUtils.isManifestPaged(manifest)
            : false;
          this.hasRecognizedTextContent = manifest
            ? ManifestUtils.hasRecognizedTextContent(manifest)
            : false;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setLayoutOnePage(): void {
    this.viewerLayoutService.setLayout(ViewerLayout.ONE_PAGE);
  }

  setLayoutTwoPage(): void {
    this.viewerLayoutService.setLayout(ViewerLayout.TWO_PAGE);
  }

  hideRecognizedTextContent(): void {
    this.viewerService.showPages();
    this.altoService.hideRecognizedTextContent();
  }

  showRecognizedTextContentInSplitView(): void {
    const prev = this.altoService.recognizedTextContentMode;

    if (prev === RecognizedTextMode.ONLY) {
      this.viewerService.showPages();
      setTimeout(() => {
        this.viewerService.home();
      }, ViewerOptions.transitions.OSDAnimationTime);
    }
    this.altoService.showRecognizedTextContentInSplitView();
  }

  showRecognizedTextContentOnly(): void {
    this.viewerService.hidePages();
    this.altoService.showRecognizedTextContentOnly();
  }
}

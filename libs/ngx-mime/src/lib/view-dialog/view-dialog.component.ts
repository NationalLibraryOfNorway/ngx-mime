import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AltoService } from '../core/alto-service/alto.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ManifestUtils } from '../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { RecognizedTextMode, RecognizedTextModeChanges } from '../core/models';
import { Dimensions } from '../core/models/dimensions';
import { Manifest } from '../core/models/manifest';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';

@Component({
  selector: 'mime-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss'],
})
export class ViewDialogComponent implements OnInit, OnDestroy {
  isHandsetOrTabletInPortrait = false;
  viewerLayout: ViewerLayout = ViewerLayout.ONE_PAGE;
  ViewerLayout: typeof ViewerLayout = ViewerLayout;
  isPagedManifest = false;
  hasRecognizedTextContent = false;
  recognizedTextMode = RecognizedTextMode.NONE;
  RecognizedTextMode: typeof RecognizedTextMode = RecognizedTextMode;
  contentStyle: any;
  private subscriptions = new Subscription();

  constructor(
    public intl: MimeViewerIntl,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private viewerLayoutService: ViewerLayoutService,
    private iiifManifestService: IiifManifestService,
    private altoService: AltoService,
    private mimeResizeService: MimeResizeService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
        .subscribe(
          (value: BreakpointState) =>
            (this.isHandsetOrTabletInPortrait = value.matches),
        ),
    );

    this.subscriptions.add(
      this.viewerLayoutService.onChange.subscribe(
        (viewerLayout: ViewerLayout) => {
          this.viewerLayout = viewerLayout;
        },
      ),
    );
    this.subscriptions.add(
      this.altoService.onRecognizedTextContentModeChange$.subscribe(
        (recognizedTextModeChanges: RecognizedTextModeChanges) => {
          this.recognizedTextMode = recognizedTextModeChanges.currentValue;
        },
      ),
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
        },
      ),
    );
    this.subscriptions.add(
      this.mimeResizeService.onResize.subscribe((rect) => {
        this.resizeHeight(rect);
      }),
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

  closeRecognizedTextContent(): void {
    this.altoService.closeRecognizedTextContent();
  }

  showRecognizedTextContentInSplitView(): void {
    this.altoService.showRecognizedTextContentInSplitView();
  }

  showRecognizedTextContentOnly(): void {
    this.altoService.showRecognizedTextContentOnly();
  }

  private resizeHeight(rect: Dimensions): void {
    let maxHeight = rect.height - 192 + 'px';
    if (this.isHandsetOrTabletInPortrait) {
      maxHeight = rect.height + 'px';
    }
    this.contentStyle = {
      maxHeight,
    };
    this.cdr.detectChanges();
  }
}

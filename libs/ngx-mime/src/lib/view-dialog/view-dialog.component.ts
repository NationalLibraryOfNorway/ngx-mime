import { NgStyle } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatButtonToggle } from '@angular/material/button-toggle';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { AltoService } from '../core/alto-service/alto.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ManifestUtils } from '../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { RecognizedTextMode } from '../core/models';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { IconComponent } from './icon/icon.component';

@Component({
  selector: 'mime-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss'],
  imports: [
    MatToolbar,
    MatIconButton,
    MatTooltip,
    MatDialogClose,
    MatIcon,
    MatDialogTitle,
    MatDialogContent,
    NgStyle,
    MatButtonToggle,
    IconComponent,
    MatDivider,
  ],
})
export class ViewDialogComponent {
  private readonly viewerLayoutService = inject(ViewerLayoutService);
  private readonly altoService = inject(AltoService);
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly mimeResizeService = inject(MimeResizeService);
  readonly intl = inject(MimeViewerIntl).value;

  ViewerLayout: typeof ViewerLayout = ViewerLayout;
  readonly RecognizedTextMode = RecognizedTextMode;
  readonly isHandsetOrTabletInPortrait =
    this.viewerLayoutService.isHandsetOrTabletInPortrait;
  readonly viewerLayout = this.viewerLayoutService.viewerLayout;
  readonly recognizedTextMode = this.altoService.recognizedTextContentMode;
  readonly manifest = this.iiifManifestService.manifest;
  readonly isPagedManifest = computed(() => this.isCurrentManifestPaged());
  readonly hasRecognizedTextContent = computed(() =>
    this.currentManifestHasRecognizedTextContent(),
  );
  readonly mimeHeight = computed(
    () => this.mimeResizeService.dimensions()?.height ?? 0,
  );
  readonly tabHeight = computed(() => this.getTabHeight());

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

  private isCurrentManifestPaged(): boolean {
    const manifest = this.manifest();

    return manifest ? ManifestUtils.isManifestPaged(manifest) : false;
  }

  private currentManifestHasRecognizedTextContent(): boolean {
    const manifest = this.manifest();

    return manifest ? ManifestUtils.hasRecognizedTextContent(manifest) : false;
  }

  private getTabHeight(): { maxHeight: string } {
    const height = this.isHandsetOrTabletInPortrait()
      ? window.innerHeight - 128
      : this.mimeHeight() - 220;

    return { maxHeight: `${height}px` };
  }
}

import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { MetadataComponent } from './metadata/metadata.component';
import { TocComponent } from './table-of-contents/table-of-contents.component';

@Component({
  selector: 'mime-information',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatToolbar,
    MatIconButton,
    MatTooltip,
    MatDialogClose,
    MatIcon,
    MatDialogTitle,
    MatDialogContent,
    MatTabGroup,
    MatTab,
    NgStyle,
    MetadataComponent,
    TocComponent,
  ],
})
export class InformationDialogComponent {
  private readonly dialogRef =
    inject<MatDialogRef<InformationDialogComponent>>(MatDialogRef);
  private readonly viewerLayoutService = inject(ViewerLayoutService);
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly mimeResizeService = inject(MimeResizeService);
  readonly intl = inject(MimeViewerIntl).value;

  readonly selectedIndex = signal(0);
  readonly isHandsetOrTabletInPortrait =
    this.viewerLayoutService.isHandsetOrTabletInPortrait;
  readonly manifest = this.iiifManifestService.manifest;
  readonly showToc = computed(() =>
    Boolean(this.manifest()?.structures?.length),
  );
  readonly mimeHeight = computed(
    () => this.mimeResizeService.dimensions()?.height ?? 0,
  );
  readonly tabHeight = computed(() => this.getTabHeight());

  onCanvasChanged() {
    if (this.isHandsetOrTabletInPortrait()) {
      this.dialogRef.close();
    }
  }

  private getTabHeight(): { maxHeight: string } {
    const height = this.isHandsetOrTabletInPortrait()
      ? window.innerHeight - 128
      : this.mimeHeight() - 288;

    return { maxHeight: `${height}px` };
  }
}

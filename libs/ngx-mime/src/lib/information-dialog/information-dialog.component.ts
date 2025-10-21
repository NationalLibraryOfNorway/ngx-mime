import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
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
import { Subscription } from 'rxjs';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Dimensions } from '../core/models/dimensions';
import { Manifest } from './../core/models/manifest';
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
export class InformationDialogComponent implements OnInit, OnDestroy {
  intl = inject(MimeViewerIntl);
  private breakpointObserver = inject(BreakpointObserver);
  private dialogRef =
    inject<MatDialogRef<InformationDialogComponent>>(MatDialogRef);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private iiifManifestService = inject(IiifManifestService);
  private mimeResizeService = inject(MimeResizeService);
  public manifest: Manifest | null = null;
  public tabHeight = {};
  public showToc = false;
  public selectedIndex = 0;
  isHandsetOrTabletInPortrait = false;
  private mimeHeight = 0;
  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
        .subscribe(
          (value: BreakpointState) =>
            (this.isHandsetOrTabletInPortrait = value.matches),
        ),
    );

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.manifest = manifest;
          this.showToc =
            this.manifest !== null &&
            this.manifest.structures !== undefined &&
            this.manifest.structures.length > 0;
        },
      ),
    );

    this.subscriptions.add(
      this.mimeResizeService.onResize.subscribe((dimensions: Dimensions) => {
        this.mimeHeight = dimensions.height;
        this.resizeTabHeight();
      }),
    );

    this.resizeTabHeight();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onCanvasChanged() {
    if (this.isHandsetOrTabletInPortrait) {
      this.dialogRef.close();
    }
  }

  private resizeTabHeight(): void {
    let height = this.mimeHeight;

    if (this.isHandsetOrTabletInPortrait) {
      this.tabHeight = {
        maxHeight: window.innerHeight - 128 + 'px',
      };
    } else {
      height -= 288;
      this.tabHeight = {
        maxHeight: height + 'px',
      };
    }
    this.changeDetectorRef.detectChanges();
  }
}

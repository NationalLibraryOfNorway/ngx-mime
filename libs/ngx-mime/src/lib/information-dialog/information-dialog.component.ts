import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Dimensions } from '../core/models/dimensions';
import { Manifest } from './../core/models/manifest';

@Component({
  selector: 'mime-information',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationDialogComponent implements OnInit, OnDestroy {
  public manifest: Manifest | null = null;
  public tabHeight = {};
  public showToc = false;
  public selectedIndex = 0;
  isHandsetOrTabletInPortrait = false;
  private mimeHeight = 0;
  private subscriptions = new Subscription();

  constructor(
    public intl: MimeViewerIntl,
    private breakpointObserver: BreakpointObserver,
    private dialogRef: MatDialogRef<InformationDialogComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService,
    private mimeResizeService: MimeResizeService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
        .subscribe(
          (value: BreakpointState) =>
            (this.isHandsetOrTabletInPortrait = value.matches)
        )
    );

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.manifest = manifest;
          this.showToc =
            this.manifest !== null &&
            this.manifest.structures !== undefined &&
            this.manifest.structures.length > 0;
        }
      )
    );
    this.subscriptions.add(
      this.mimeResizeService.onResize.subscribe((dimensions: Dimensions) => {
        this.mimeHeight = dimensions.height;
        this.resizeTabHeight();
      })
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
      height -= 278;
      this.tabHeight = {
        maxHeight: height + 'px',
      };
    }
    this.changeDetectorRef.detectChanges();
  }
}

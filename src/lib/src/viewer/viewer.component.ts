import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ChangeDetectorRef,
  ElementRef,
  NgZone
} from '@angular/core';
import { MdDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../core/viewer-intl';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { ContentsDialogService } from './../contents-dialog/contents-dialog.service';
import { Manifest } from '../core/models/manifest';
import { Options } from '../core/models/options';

declare const OpenSeadragon: any;
@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public manifestUri: string;
  public viewer: any;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private zone: NgZone,
    private el: ElementRef,
    private iiifManifestService: IiifManifestService,
    private contentsDialogService: ContentsDialogService,
    private dialog: MdDialog) {
    contentsDialogService.elementRef = el;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.iiifManifestService.currentManifest
      .subscribe((manifest: Manifest) => {
        this.cleanUp();
        this.setUpViewer(manifest);
      })
    );
    this.loadManifest();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['manifestUri']) {
      const manifestUriChanges: SimpleChange = changes['manifestUri'];
      if (!manifestUriChanges.isFirstChange() && manifestUriChanges.currentValue !== manifestUriChanges.firstChange) {
        this.manifestUri = manifestUriChanges.currentValue;
        this.cleanUp();
        this.loadManifest();
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  private loadManifest() {
    this.iiifManifestService.load(this.manifestUri);
  }

  private cleanUp() {
    this.closeAllDialogs();
    if (this.viewer != null && this.viewer.isOpen()) {
      this.viewer.destroy();
    }
  }

  private setUpViewer(manifest: Manifest) {
    if (manifest.tileSource) {
      this.zone.runOutsideAngular(() => {
        this.viewer = new OpenSeadragon.Viewer(Object.assign({}, new Options(manifest.tileSource)));
      });
    }
  }

  public closeAllDialogs() {
    this.dialog.closeAll();
  }
}

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
  ElementRef
} from '@angular/core';
import { MdDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './viewer-intl';
import { IiifService } from '../core/iiif-service/iiif-service';
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
  public manifest: Manifest;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private el: ElementRef,
    private iiifService: IiifService,
    private contentsDialogService: ContentsDialogService,
    private dialog: MdDialog) {
      contentsDialogService.elementRef = el;
    }

  ngOnInit(): void {
    this.createViewer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['manifestUri']) {
      const manifestUriChanges: SimpleChange = changes['manifestUri'];
      if (!manifestUriChanges.isFirstChange() && manifestUriChanges.currentValue !== manifestUriChanges.firstChange) {
        this.manifestUri = manifestUriChanges.currentValue;
        this.closeAllDialogs();
        this.createViewer();
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  private createViewer() {
    if (this.manifestUri) {
      this.subscriptions.push(
        this.iiifService.getManifest(this.manifestUri)
          .subscribe((manifest: Manifest) => {
            this.manifest = manifest;
            this.contentsDialogService.manifest = manifest;
            if (this.viewer != null && this.viewer.isOpen()) {
              this.viewer.destroy();
            }
            this.viewer = new OpenSeadragon.Viewer(Object.assign({}, new Options(manifest.tileSource)));
          })
      );
    }
  }

  public closeAllDialogs() {
    this.dialog.closeAll();
  }
}

import { Injectable, ElementRef } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { ContentSearchDialogComponent } from './content-search-dialog.component';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { Manifest } from './../core/models/manifest';

@Injectable()
export class ContentSearchDialogService {
  private _el: ElementRef;
  private isContentSearchDialogOpen = false;
  private dialogRef: MdDialogRef<ContentSearchDialogComponent>;

  constructor(
    private dialog: MdDialog,
    private contentSearchDialogConfigStrategyFactory: ContentSearchDialogConfigStrategyFactory,
    private mimeResizeService: MimeResizeService) {
      mimeResizeService.onResize.subscribe(rect => {
        if (this.isContentSearchDialogOpen) {
          const config = this.getDialogConfig();
          this.dialogRef.updatePosition(config.position);
          this.dialogRef.updateSize(config.width, config.height);
        }
      });
  }

  public destroy() {
    this.close();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  public open() {
    if (!this.isContentSearchDialogOpen) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(ContentSearchDialogComponent, config);
      this.dialogRef.afterClosed().subscribe(result => {
        this.isContentSearchDialogOpen = false;
      });
      this.isContentSearchDialogOpen = true;
    }
  }

  public close() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.isContentSearchDialogOpen = false;
    }
    this.isContentSearchDialogOpen = false;
  }

  public toggle() {
    this.isContentSearchDialogOpen ? this.close() : this.open();
  }

  private getDialogConfig(): MdDialogConfig {
    return this.contentSearchDialogConfigStrategyFactory.create().getConfig(this._el);
  }

}

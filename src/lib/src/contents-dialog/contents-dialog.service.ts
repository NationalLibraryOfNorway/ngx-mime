import { Injectable, ElementRef } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { ContentsDialogComponent } from './contents-dialog.component';
import { ContentsDialogConfigStrategyFactory } from './contents-dialog-config-strategy-factory';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { ObservableMedia } from '@angular/flex-layout';

@Injectable()
export class ContentsDialogService {
  private _el: ElementRef;
  private isContentsDialogOpen = false;
  private dialogRef: MdDialogRef<ContentsDialogComponent>;
  private tabHeight = {};
  private mimeHeight = 0;

  constructor(
    private dialog: MdDialog,
    private contentsDialogConfigStrategyFactory: ContentsDialogConfigStrategyFactory,
    private mimeResizeService: MimeResizeService,
    private mimeDomHelper: MimeDomHelper,
    private media: ObservableMedia) {
      mimeResizeService.onResize.subscribe(rect => {
        if (this.isContentsDialogOpen) {
          const config = this.getDialogConfig();
          this.dialogRef.updatePosition(config.position);
          this.dialogRef.updateSize(config.width, config.height);
        }
      });
      console.log('j');
  }

  public destroy() {
    this.close();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  public open() {
    if (!this.isContentsDialogOpen) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(ContentsDialogComponent, config);
      this.dialogRef.afterClosed().subscribe(result => {
        this.isContentsDialogOpen = false;
      });
      this.isContentsDialogOpen = true;
    }
  }

  public close() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.isContentsDialogOpen = false;
    }
    this.isContentsDialogOpen = false;
  }

  public toggle() {
    this.isContentsDialogOpen ? this.close() : this.open();
  }

  public resizeTabHeight(): void {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
    let height = this.mimeHeight;

    if (this.media.isActive('lt-md')) {
      height -= 104;
      this.tabHeight = {
        'maxHeight': window.innerHeight - 128 + 'px'
      };
    } else {
      height -= 208;
      this.tabHeight = {
        'maxHeight': height + 'px'
      };
    }
  }

  private getDialogConfig(): MdDialogConfig {
    return this.contentsDialogConfigStrategyFactory.create().getConfig(this._el);
  }

}

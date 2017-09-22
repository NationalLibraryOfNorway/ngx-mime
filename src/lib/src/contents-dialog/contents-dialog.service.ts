import { Injectable, ElementRef } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { ContentsDialogComponent } from './contents-dialog.component';
import { ContentsDialogConfigStrategyFactory } from './contents-dialog-config-strategy-factory';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';

@Injectable()
export class ContentsDialogService {
  private _el: ElementRef;
  private isContentsDialogOpen = false;
  private dialogRef: MdDialogRef<ContentsDialogComponent>;

  constructor(
    private dialog: MdDialog,
    private contentsDialogConfigStrategyFactory: ContentsDialogConfigStrategyFactory,
    private mimeResizeService: MimeResizeService) {
      mimeResizeService.onResize.subscribe(rect => {
        if (this.isContentsDialogOpen) {
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

  private getDialogConfig(): MdDialogConfig {
    return this.contentsDialogConfigStrategyFactory.create().getConfig(this._el);
  }

}

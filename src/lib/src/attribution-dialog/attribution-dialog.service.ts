import { Observable } from 'rxjs/Observable';
import { Injectable, ElementRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { AttributionDialogComponent } from './attribution-dialog.component';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { MimeDomHelper } from './../core/mime-dom-helper';
import { Dimensions } from './../core/models/dimensions';

@Injectable()
export class AttributionDialogService {
  private isAttributionDialogOpen = false;
  private dialogRef: MdDialogRef<AttributionDialogComponent>;
  private _el: ElementRef;
  private attributionDialogHeight = 0;

  constructor(
    private dialog: MdDialog,
    private mimeResizeService: MimeResizeService,
    private attributionDialogResizeService: AttributionDialogResizeService,
    private mimeDomHelper: MimeDomHelper
  ) {
    mimeResizeService.onResize.subscribe((dimensions: Dimensions) => {
      if (this.isAttributionDialogOpen) {
        const config = this.getDialogConfig();
        this.dialogRef.updatePosition(config.position);
      }
    });
    attributionDialogResizeService.onResize.subscribe((dimensions: Dimensions) => {
      if (this.isAttributionDialogOpen) {
        this.attributionDialogHeight = dimensions.height;
        const config = this.getDialogConfig();
        this.dialogRef.updatePosition(config.position);
      }
    });

  }

  public destroy() {
    this.close();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  public open(timeout?: number): void {
    if (!this.isAttributionDialogOpen) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(AttributionDialogComponent, config);
      this.dialogRef.afterClosed().subscribe(result => {
        this.isAttributionDialogOpen = false;
      });
      this.isAttributionDialogOpen = true;
      this.closeDialogAfter(timeout);
    }
  }

  public close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.isAttributionDialogOpen = false;
    }
  }

  public toggle(): void {
    this.isAttributionDialogOpen ? this.close() : this.open();
  }

  private closeDialogAfter(seconds: number) {
    if (seconds > 0) {
      Observable
        .interval(seconds * 1000)
        .subscribe(() => {
          this.close();
        });
    }
  }

  private getDialogConfig(): MdDialogConfig {
    const dimensions = this.getPosition(this._el);
    return {
      hasBackdrop: false,
      disableClose: true,
      width: '170px',
      panelClass: 'attribution-panel',
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px',
      }
    };
  }

  private getPosition(el: ElementRef) {
    const padding = 20;
    const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
    return new Dimensions({
      top: dimensions.top + dimensions.height - this.attributionDialogHeight - padding,
      left: dimensions.left + padding
    });
  }

}

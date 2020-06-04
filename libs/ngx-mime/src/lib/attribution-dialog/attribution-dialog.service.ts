import { Injectable, ElementRef } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material/dialog';
import { Observable, Subscription, Subject, interval } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { AttributionDialogComponent } from './attribution-dialog.component';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { Dimensions } from '../core/models/dimensions';

@Injectable()
export class AttributionDialogService {
  private isAttributionDialogOpen = false;
  private dialogRef: MatDialogRef<AttributionDialogComponent>;
  private _el: ElementRef;
  private attributionDialogHeight = 0;
  private destroyed: Subject<void> = new Subject();

  constructor(
    private dialog: MatDialog,
    private mimeResizeService: MimeResizeService,
    private attributionDialogResizeService: AttributionDialogResizeService,
    private mimeDomHelper: MimeDomHelper
  ) {}

  public initialize(): void {
    this.mimeResizeService.onResize
      .pipe(takeUntil(this.destroyed))
      .subscribe((dimensions: Dimensions) => {
        if (this.isAttributionDialogOpen) {
          const config = this.getDialogConfig();
          this.dialogRef.updatePosition(config.position);
        }
      });
    this.attributionDialogResizeService.onResize
      .pipe(takeUntil(this.destroyed))
      .subscribe((dimensions: Dimensions) => {
        if (this.isAttributionDialogOpen) {
          this.attributionDialogHeight = dimensions.height;
          const config = this.getDialogConfig();
          this.dialogRef.updatePosition(config.position);
        }
      });
  }

  public destroy() {
    this.close();
    this.destroyed.next();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  public open(timeout?: number): void {
    if (!this.isAttributionDialogOpen) {
      /**
       * Sleeping for material animations to finish
       * fix: https://github.com/angular/material2/issues/7438
       */
      interval(1000)
        .pipe(take(1))
        .subscribe(() => {
          const config = this.getDialogConfig();
          this.dialogRef = this.dialog.open(AttributionDialogComponent, config);
          this.dialogRef.afterClosed().subscribe((result) => {
            this.isAttributionDialogOpen = false;
            this.mimeDomHelper.setFocusOnViewer();
          });
          this.isAttributionDialogOpen = true;
          this.closeDialogAfter(timeout);
        });
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
      interval(seconds * 1000)
        .pipe(take(1))
        .subscribe(() => {
          this.close();
        });
    }
  }

  private getDialogConfig(): MatDialogConfig {
    const dimensions = this.getPosition(this._el);
    return {
      hasBackdrop: false,
      width: '180px',
      panelClass: 'attribution-panel',
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px'
      },
      autoFocus: true,
      restoreFocus: false
    };
  }

  private getPosition(el: ElementRef) {
    const padding = 20;
    const dimensions = this.mimeDomHelper.getBoundingClientRect(el);
    return new Dimensions({
      top:
        dimensions.top + dimensions.height - this.attributionDialogHeight - 68,
      left: dimensions.left + padding
    });
  }
}

import { ElementRef, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Dimensions } from '../core/models/dimensions';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { AttributionDialogComponent } from './attribution-dialog.component';

@Injectable()
export class AttributionDialogService {
  private isAttributionDialogOpen = false;
  private dialogRef: MatDialogRef<AttributionDialogComponent> | null = null;
  private _el: ElementRef | null = null;
  private attributionDialogHeight = 0;
  private subscriptions!: Subscription;

  constructor(
    private dialog: MatDialog,
    private mimeResizeService: MimeResizeService,
    private attributionDialogResizeService: AttributionDialogResizeService,
    private mimeDomHelper: MimeDomHelper
  ) {}

  public initialize(): void {
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.mimeResizeService.onResize.subscribe((dimensions: Dimensions) => {
        if (this.dialogRef && this.isAttributionDialogOpen) {
          const config = this.getDialogConfig();
          this.dialogRef.updatePosition(config.position);
        }
      })
    );
    this.subscriptions.add(
      this.attributionDialogResizeService.onResize.subscribe(
        (dimensions: Dimensions) => {
          if (this.dialogRef && this.isAttributionDialogOpen) {
            this.attributionDialogHeight = dimensions.height;
            const config = this.getDialogConfig();
            this.dialogRef.updatePosition(config.position);
          }
        }
      )
    );
  }

  public destroy() {
    this.close();
    this.unsubscribe();
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
          this.dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((result) => {
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

  private closeDialogAfter(seconds: number | undefined) {
    if (seconds && seconds > 0) {
      interval(seconds * 1000)
        .pipe(take(1))
        .subscribe(() => {
          this.close();
        });
    }
  }

  private getDialogConfig(): MatDialogConfig {
    const dimensions = this.getPosition();
    return {
      hasBackdrop: false,
      width: '180px',
      panelClass: 'attribution-panel',
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px',
      },
      autoFocus: true,
      restoreFocus: false,
    };
  }

  private getPosition() {
    if (!this._el) {
      throw new Error(`Could not find position because element is missing`);
    }
    const padding = 20;
    const dimensions = this.mimeDomHelper.getBoundingClientRect(this._el);
    return new Dimensions({
      top:
        dimensions.top + dimensions.height - this.attributionDialogHeight - 68,
      left: dimensions.left + padding,
    });
  }

  private unsubscribe() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}

import { ElementRef, Injectable, ViewContainerRef } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatDialogState,
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
  private dialogRef?: MatDialogRef<AttributionDialogComponent>;
  private _el: ElementRef | null = null;
  private _viewContainerRef: ViewContainerRef | undefined;
  private attributionDialogHeight = 0;
  private subscriptions!: Subscription;

  constructor(
    private dialog: MatDialog,
    private mimeResizeService: MimeResizeService,
    private attributionDialogResizeService: AttributionDialogResizeService,
    private mimeDomHelper: MimeDomHelper,
  ) {}

  public initialize(): void {
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.mimeResizeService.onResize.subscribe(() => {
        if (this.isOpen()) {
          const config = this.getDialogConfig();
          this.dialogRef?.updatePosition(config.position);
        }
      }),
    );
    this.subscriptions.add(
      this.attributionDialogResizeService.onResize.subscribe(
        (dimensions: Dimensions) => {
          if (this.isOpen()) {
            this.attributionDialogHeight = dimensions.height;
            const config = this.getDialogConfig();
            this.dialogRef?.updatePosition(config.position);
          }
        },
      ),
    );
  }

  public destroy(): void {
    this.close();
    this.unsubscribe();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  set viewContainerRef(viewContainerRef: ViewContainerRef) {
    this._viewContainerRef = viewContainerRef;
  }

  public open(timeout?: number): void {
    if (!this.isOpen()) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(AttributionDialogComponent, config);
      this.dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe(() => {
          this.mimeDomHelper.setFocusOnViewer();
        });
      this.closeDialogAfter(timeout);
    }
  }

  public close(): void {
    if (this.isOpen()) {
      this.dialogRef?.close();
    }
  }

  public toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  public isOpen(): boolean {
    return this.dialogRef?.getState() === MatDialogState.OPEN;
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
    if (!this._viewContainerRef) {
      throw new Error('No viewContainerRef');
    }

    const dimensions = this.getPosition();
    return {
      hasBackdrop: false,
      width: '180px',
      panelClass: ['mime-dialog', 'attribution-panel'],
      position: {
        top: dimensions.top + 'px',
        left: dimensions.left + 'px',
      },
      autoFocus: true,
      restoreFocus: false,
      viewContainerRef: this._viewContainerRef,
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

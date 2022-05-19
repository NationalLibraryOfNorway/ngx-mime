import { ElementRef, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatDialogState,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { ViewDialogConfigStrategyFactory } from './view-dialog-config-strategy-factory';
import { ViewDialogComponent } from './view-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ViewDialogService {
  private _el: ElementRef | null = null;
  private dialogRef?: MatDialogRef<ViewDialogComponent>;
  private subscriptions!: Subscription;

  constructor(
    private dialog: MatDialog,
    private viewDialogConfigStrategyFactory: ViewDialogConfigStrategyFactory,
    private mimeResizeService: MimeResizeService
  ) {}

  public initialize(): void {
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.mimeResizeService.onResize.subscribe((rect) => {
        if (this.isOpen()) {
          const config = this.getDialogConfig();
          this.dialogRef?.updatePosition(config.position);
          this.dialogRef?.updateSize(config.width, config.height);
        }
      })
    );
  }

  public destroy(): void {
    this.close();
    this.unsubscribe();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  public open(): void {
    if (!this.isOpen()) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(ViewDialogComponent, config);
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

  private getDialogConfig(): MatDialogConfig {
    return this.viewDialogConfigStrategyFactory.create().getConfig(this._el);
  }

  private unsubscribe() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}

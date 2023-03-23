import { ElementRef, Injectable, ViewContainerRef } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatDialogState,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { InformationDialogConfigStrategyFactory } from './information-dialog-config-strategy-factory';
import { InformationDialogComponent } from './information-dialog.component';

@Injectable()
export class InformationDialogService {
  private _el: ElementRef | null = null;
  private dialogRef?: MatDialogRef<InformationDialogComponent>;
  private subscriptions!: Subscription;

  constructor(
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private informationDialogConfigStrategyFactory: InformationDialogConfigStrategyFactory,
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

  public destroy() {
    this.close();
    this.unsubscribe();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  public open(selectedIndex?: number): void {
    if (!this.isOpen()) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(InformationDialogComponent, config);

      if (selectedIndex) {
        this.dialogRef.componentInstance.selectedIndex = selectedIndex;
      }
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

  public getSelectedIndex(): number {
    return this.dialogRef?.componentInstance?.selectedIndex ?? 0;
  }

  private getDialogConfig(): MatDialogConfig {
    if (!this._el) {
      throw new Error('No element');
    }
    return this.informationDialogConfigStrategyFactory
      .create()
      .getConfig(this._el, this.viewContainerRef);
  }

  private unsubscribe() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}

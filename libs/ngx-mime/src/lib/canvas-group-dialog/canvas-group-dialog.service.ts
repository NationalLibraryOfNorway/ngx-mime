import { Injectable, ViewContainerRef } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatDialogState,
} from '@angular/material/dialog';
import { CanvasGroupDialogComponent } from './canvas-group-dialog.component';

@Injectable()
export class CanvasGroupDialogService {
  private dialogRef?: MatDialogRef<CanvasGroupDialogComponent>;

  constructor(
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef
  ) {}

  public initialize(): void {}

  public destroy() {
    this.close();
  }

  public open(): void {
    if (!this.isOpen()) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(CanvasGroupDialogComponent, config);
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
    return {
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'canvas-group-panel',
      viewContainerRef: this.viewContainerRef,
    };
  }
}

import { Injectable, ViewContainerRef, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatDialogState,
} from '@angular/material/dialog';
import { CanvasGroupDialogComponent } from './canvas-group-dialog.component';

@Injectable({providedIn: 'root'})
export class CanvasGroupDialogService {
  private readonly dialog = inject(MatDialog);
  private dialogRef?: MatDialogRef<CanvasGroupDialogComponent>;
  private _viewContainerRef: ViewContainerRef | undefined;

  set viewContainerRef(viewContainerRef: ViewContainerRef) {
    this._viewContainerRef = viewContainerRef;
  }

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
      panelClass: ['mime-dialog', 'canvas-group-panel'],
      viewContainerRef: this._viewContainerRef,
    };
  }
}

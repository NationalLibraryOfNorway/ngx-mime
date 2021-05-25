import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { CanvasGroupDialogComponent } from './canvas-group-dialog.component';

@Injectable()
export class CanvasGroupDialogService {
  private isCanvasGroupDialogOpen = false;
  private dialogRef: MatDialogRef<CanvasGroupDialogComponent> | null = null;

  constructor(private dialog: MatDialog) {}

  public initialize(): void {}

  public destroy() {
    this.close();
  }

  public open(timeout?: number): void {
    if (!this.isCanvasGroupDialogOpen) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(CanvasGroupDialogComponent, config);
      this.dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe((result) => {
          this.isCanvasGroupDialogOpen = false;
        });
      this.isCanvasGroupDialogOpen = true;
    }
  }

  public close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.isCanvasGroupDialogOpen = false;
    }
  }

  public toggle(): void {
    this.isCanvasGroupDialogOpen ? this.close() : this.open();
  }

  private getDialogConfig(): MatDialogConfig {
    return {
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'canvas-group-panel',
    };
  }
}

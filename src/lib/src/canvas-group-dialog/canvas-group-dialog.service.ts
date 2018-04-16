import { Observable } from 'rxjs/Observable';
import { Injectable, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { take } from 'rxjs/operators/take';
import { interval } from 'rxjs/observable/interval';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { CanvasGroupDialogComponent } from './canvas-group-dialog.component';

@Injectable()
export class CanvasGroupDialogService {
  private isCanvasGroupDialogOpen = false;
  private dialogRef: MatDialogRef<CanvasGroupDialogComponent>;
  private destroyed: Subject<void> = new Subject();

  constructor(private dialog: MatDialog) {}

  public initialize(): void {}

  public destroy() {
    this.close();
    this.destroyed.next();
  }

  public open(timeout?: number): void {
    if (!this.isCanvasGroupDialogOpen) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(CanvasGroupDialogComponent, config);
      this.dialogRef.afterClosed().subscribe(result => {
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
      panelClass: 'canvas-group-panel'
    };
  }
}

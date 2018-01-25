import { Observable } from 'rxjs/Observable';
import { Injectable, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { take } from 'rxjs/operators/take';
import { interval } from 'rxjs/observable/interval';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { PageDialogComponent } from './page-dialog.component';

@Injectable()
export class PageDialogService {
  private isPageDialogOpen = false;
  private dialogRef: MatDialogRef<PageDialogComponent>;
  private destroyed: Subject<void> = new Subject();

  constructor(private dialog: MatDialog) { }

  public initialize(): void { }

  public destroy() {
    this.close();
    this.destroyed.next();
  }

  public open(timeout?: number): void {
    if (!this.isPageDialogOpen) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(PageDialogComponent, config);
      this.dialogRef.afterClosed().subscribe(result => {
        this.isPageDialogOpen = false;
      });
      this.isPageDialogOpen = true;
    }
  }

  public close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.isPageDialogOpen = false;
    }
  }

  public toggle(): void {
    this.isPageDialogOpen ? this.close() : this.open();
  }

  private getDialogConfig(): MatDialogConfig {
    return {
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'page-panel',
    };
  }

}

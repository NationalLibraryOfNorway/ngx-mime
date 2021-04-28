import { ElementRef, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { ContentsDialogConfigStrategyFactory } from './contents-dialog-config-strategy-factory';
import { ContentsDialogComponent } from './contents-dialog.component';

@Injectable()
export class ContentsDialogService {
  private _el: ElementRef;
  private isContentsDialogOpen = false;
  private dialogRef: MatDialogRef<ContentsDialogComponent>;
  private subscriptions: Subscription;

  constructor(
    private dialog: MatDialog,
    private contentsDialogConfigStrategyFactory: ContentsDialogConfigStrategyFactory,
    private mimeResizeService: MimeResizeService
  ) {}

  public initialize(): void {
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.mimeResizeService.onResize.subscribe((rect) => {
        if (this.isContentsDialogOpen) {
          const config = this.getDialogConfig();
          this.dialogRef.updatePosition(config.position);
          this.dialogRef.updateSize(config.width, config.height);
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

  public open(selectedIndex?: number) {
    if (!this.isContentsDialogOpen) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(ContentsDialogComponent, config);

      if (selectedIndex) {
        this.dialogRef.componentInstance.selectedIndex = selectedIndex;
      }

      this.dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe((result) => {
          this.isContentsDialogOpen = false;
        });
      this.isContentsDialogOpen = true;
    }
  }

  public close() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.isContentsDialogOpen = false;
    }
    this.isContentsDialogOpen = false;
  }

  public toggle() {
    this.isContentsDialogOpen ? this.close() : this.open();
  }

  public isOpen(): boolean {
    return this.isContentsDialogOpen;
  }

  public getSelectedIndex(): number {
    return this.dialogRef && this.dialogRef.componentInstance
      ? this.dialogRef.componentInstance.selectedIndex
      : 0;
  }

  private getDialogConfig(): MatDialogConfig {
    return this.contentsDialogConfigStrategyFactory
      .create()
      .getConfig(this._el);
  }

  private unsubscribe() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}

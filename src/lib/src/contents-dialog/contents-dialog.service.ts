import { Injectable, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { ContentsDialogComponent } from './contents-dialog.component';
import { ContentsDialogConfigStrategyFactory } from './contents-dialog-config-strategy-factory';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';


@Injectable()
export class ContentsDialogService {
  private _el: ElementRef;
  private _isContentsDialogOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private dialogRef: MatDialogRef<ContentsDialogComponent>;
  private destroyed: Subject<void> = new Subject();

  constructor(
    private dialog: MatDialog,
    private contentsDialogConfigStrategyFactory: ContentsDialogConfigStrategyFactory,
    private mimeResizeService: MimeResizeService) {
  }

  get isContentDialogOpen(): Observable<boolean> {
    return this._isContentsDialogOpen.asObservable();
  }

  public initialize(): void {
    this.mimeResizeService
      .onResize
      .pipe(
        takeUntil(this.destroyed)
      ).subscribe(rect => {
        if (this._isContentsDialogOpen.getValue()) {
          const config = this.getDialogConfig();
          this.dialogRef.updatePosition(config.position);
          this.dialogRef.updateSize(config.width, config.height);
        }
      });
  }

  public destroy() {
    this.close();
    this.destroyed.next();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  public open(selectedIndex?: number) {
    if (!this._isContentsDialogOpen.getValue()) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(ContentsDialogComponent, config);

      if (selectedIndex) {
        this.dialogRef.componentInstance.selectedIndex = selectedIndex;
      }

      this.dialogRef.afterClosed().subscribe(result => {
        this._isContentsDialogOpen.next(false);
      });
      this._isContentsDialogOpen.next(true);
    }
  }

  public close() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this._isContentsDialogOpen.next(false);
    }
    this._isContentsDialogOpen.next(false);
  }

  public toggle() {
    this._isContentsDialogOpen.getValue() ? this.close() : this.open();
  }

  public isOpen(): boolean {
    return this._isContentsDialogOpen.getValue();
  }

  public getSelectedIndex(): number {
    return this.dialogRef && this.dialogRef.componentInstance ? this.dialogRef.componentInstance.selectedIndex : 0;
  }

  private getDialogConfig(): MatDialogConfig {
    return this.contentsDialogConfigStrategyFactory.create().getConfig(this._el);
  }

}

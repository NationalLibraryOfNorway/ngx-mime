import { ElementRef, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { ContentSearchDialogComponent } from './content-search-dialog.component';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';

@Injectable()
export class ContentSearchDialogService {
  private _el: ElementRef;
  private isContentSearchDialogOpen = false;
  private dialogRef: MatDialogRef<ContentSearchDialogComponent>;
  private destroyed: Subject<void> = new Subject();

  constructor(
    private dialog: MatDialog,
    private contentSearchDialogConfigStrategyFactory: ContentSearchDialogConfigStrategyFactory,
    private mimeResizeService: MimeResizeService
  ) {}

  public initialize(): void {
    this.mimeResizeService.onResize.pipe(takeUntil(this.destroyed)).subscribe(rect => {
      if (this.isContentSearchDialogOpen) {
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

  public open() {
    if (!this.isContentSearchDialogOpen) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(ContentSearchDialogComponent, config);
      this.dialogRef.afterClosed().subscribe(result => {
        this.isContentSearchDialogOpen = false;
      });
      this.isContentSearchDialogOpen = true;
    }
  }

  public close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.isContentSearchDialogOpen = false;
  }

  public toggle() {
    this.isContentSearchDialogOpen ? this.close() : this.open();
  }

  public isOpen(): boolean {
    return this.isContentSearchDialogOpen;
  }

  private getDialogConfig(): MatDialogConfig {
    return this.contentSearchDialogConfigStrategyFactory.create().getConfig(this._el);
  }
}

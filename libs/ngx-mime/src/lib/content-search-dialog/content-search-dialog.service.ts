import { ElementRef, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
import { ContentSearchDialogComponent } from './content-search-dialog.component';

@Injectable()
export class ContentSearchDialogService {
  private _el: ElementRef;
  private isContentSearchDialogOpen = false;
  private dialogRef: MatDialogRef<ContentSearchDialogComponent>;
  private subscriptions: Subscription;

  constructor(
    private dialog: MatDialog,
    private contentSearchDialogConfigStrategyFactory: ContentSearchDialogConfigStrategyFactory,
    private mimeResizeService: MimeResizeService
  ) {}

  public initialize(): void {
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.mimeResizeService.onResize.subscribe((rect) => {
        if (this.isContentSearchDialogOpen) {
          const config = this.getDialogConfig();
          this.dialogRef.updatePosition(config.position);
          this.dialogRef.updateSize(config.width, config.height);
        }
      })
    );
  }

  public destroy() {
    this.close();
    this.subscriptions.unsubscribe();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  public open() {
    if (!this.isContentSearchDialogOpen) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(ContentSearchDialogComponent, config);
      this.dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe((result) => {
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
    return this.contentSearchDialogConfigStrategyFactory
      .create()
      .getConfig(this._el);
  }
}

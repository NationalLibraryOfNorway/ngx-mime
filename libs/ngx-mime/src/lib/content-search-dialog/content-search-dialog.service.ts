import { ElementRef, Injectable, ViewContainerRef } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatDialogState,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
import { ContentSearchDialogComponent } from './content-search-dialog.component';

@Injectable()
export class ContentSearchDialogService {
  private _el: ElementRef | undefined;
  private _viewContainerRef: ViewContainerRef | undefined;
  private dialogRef?: MatDialogRef<ContentSearchDialogComponent>;
  private subscriptions!: Subscription;

  constructor(
    private readonly dialog: MatDialog,
    private readonly contentSearchDialogConfigStrategyFactory: ContentSearchDialogConfigStrategyFactory,
    private readonly mimeResizeService: MimeResizeService,
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
      }),
    );
  }

  public destroy(): void {
    this.close();
    this.unsubscribe();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  set viewContainerRef(viewContainerRef: ViewContainerRef) {
    this._viewContainerRef = viewContainerRef;
  }

  public open(): void {
    if (!this.isOpen()) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(ContentSearchDialogComponent, config);
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
    if (!this._el || !this._viewContainerRef) {
      throw new Error('No element or viewContainerRef');
    }

    return this.contentSearchDialogConfigStrategyFactory
      .create()
      .getConfig(this._el, this._viewContainerRef);
  }

  private unsubscribe() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}

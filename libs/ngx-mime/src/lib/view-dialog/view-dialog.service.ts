import {
  ElementRef,
  effect,
  inject,
  Injectable,
  untracked,
  ViewContainerRef,
} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatDialogState,
} from '@angular/material/dialog';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { ViewDialogConfigStrategyFactory } from './view-dialog-config-strategy-factory';
import { ViewDialogComponent } from './view-dialog.component';

@Injectable()
export class ViewDialogService {
  private readonly dialog = inject(MatDialog);
  private readonly viewDialogConfigStrategyFactory = inject(
    ViewDialogConfigStrategyFactory,
  );
  private readonly mimeResizeService = inject(MimeResizeService);
  private _el: ElementRef | undefined;
  private _viewContainerRef: ViewContainerRef | undefined;
  private dialogRef?: MatDialogRef<ViewDialogComponent>;
  private initialized = false;

  constructor() {
    effect(() => {
      const dimensions = this.mimeResizeService.dimensions();

      if (dimensions && this.initialized) {
        untracked(() => this.updateDialogLayout());
      }
    });
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  set viewContainerRef(viewContainerRef: ViewContainerRef) {
    this._viewContainerRef = viewContainerRef;
  }

  public initialize(): void {
    this.initialized = true;
  }

  public destroy(): void {
    this.close();
    this.initialized = false;
  }

  public open(): void {
    if (!this.isOpen()) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(ViewDialogComponent, config);
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

    return this.viewDialogConfigStrategyFactory
      .create()
      .getConfig(this._el, this._viewContainerRef);
  }

  private updateDialogLayout(): void {
    if (this.isOpen()) {
      const config = this.getDialogConfig();
      this.dialogRef?.updatePosition(config.position);
      this.dialogRef?.updateSize(config.width, config.height);
    }
  }
}

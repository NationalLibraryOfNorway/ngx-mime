import {
  ElementRef,
  inject,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogState,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { HelpDialogConfigStrategyFactory } from './help-dialog-config-strategy-factory';
import { HelpDialogComponent } from './help-dialog.component';

@Injectable({providedIn: 'root'})
export class HelpDialogService {
  private readonly dialog = inject(MatDialog);
  private readonly helpDialogConfigStrategyFactory = inject(
    HelpDialogConfigStrategyFactory,
  );
  private readonly mimeResizeService = inject(MimeResizeService);
  private _el: ElementRef | undefined;
  private _viewContainerRef: ViewContainerRef | undefined;
  private dialogRef?: MatDialogRef<HelpDialogComponent>;
  private subscriptions!: Subscription;

  set el(el: ElementRef) {
    this._el = el;
  }

  set viewContainerRef(viewContainerRef: ViewContainerRef) {
    this._viewContainerRef = viewContainerRef;
  }

  public initialize(): void {
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.mimeResizeService.onResize.subscribe(() => {
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

  public open(): void {
    if (!this.isOpen()) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(HelpDialogComponent, config);
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

  private getDialogConfig() {
    if (!this._el || !this._viewContainerRef) {
      throw new Error('No element or viewContainerRef');
    }

    return this._el
      ? this.helpDialogConfigStrategyFactory
          .create()
          .getConfig(this._el, this._viewContainerRef)
      : {};
  }

  private unsubscribe() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}

import {
  ElementRef,
  inject,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatDialogState,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { InformationDialogConfigStrategyFactory } from './information-dialog-config-strategy-factory';
import { InformationDialogComponent } from './information-dialog.component';

@Injectable()
export class InformationDialogService {
  private readonly dialog = inject(MatDialog);
  private readonly informationDialogConfigStrategyFactory = inject(
    InformationDialogConfigStrategyFactory,
  );
  private readonly mimeResizeService = inject(MimeResizeService);
  private _el: ElementRef | undefined;
  private _viewContainerRef: ViewContainerRef | undefined;
  private dialogRef?: MatDialogRef<InformationDialogComponent>;
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
      this.mimeResizeService.onResize.subscribe((rect) => {
        if (this.isOpen()) {
          const config = this.getDialogConfig();
          this.dialogRef?.updatePosition(config.position);
          this.dialogRef?.updateSize(config.width, config.height);
        }
      }),
    );
  }

  public destroy() {
    this.close();
    this.unsubscribe();
  }

  public open(selectedIndex?: number): void {
    if (!this.isOpen()) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(InformationDialogComponent, config);

      if (selectedIndex) {
        this.dialogRef.componentInstance.selectedIndex = selectedIndex;
      }
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

  public getSelectedIndex(): number {
    return this.dialogRef?.componentInstance?.selectedIndex ?? 0;
  }

  private getDialogConfig(): MatDialogConfig {
    if (!this._el || !this._viewContainerRef) {
      throw new Error('No element or viewContainerRef');
    }

    return this.informationDialogConfigStrategyFactory
      .create()
      .getConfig(this._el, this._viewContainerRef);
  }

  private unsubscribe() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}

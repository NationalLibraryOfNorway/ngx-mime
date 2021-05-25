import { ElementRef, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { HelpDialogConfigStrategyFactory } from './help-dialog-config-strategy-factory';
import { HelpDialogComponent } from './help-dialog.component';

@Injectable()
export class HelpDialogService {
  private _el: ElementRef | null = null;
  private isHelpDialogOpen = false;
  private dialogRef!: MatDialogRef<HelpDialogComponent>;
  private subscriptions!: Subscription;

  constructor(
    private dialog: MatDialog,
    private helpDialogConfigStrategyFactory: HelpDialogConfigStrategyFactory,
    private mimeResizeService: MimeResizeService
  ) {}

  public initialize(): void {
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.mimeResizeService.onResize.subscribe(() => {
        if (this.isHelpDialogOpen) {
          const config = this.getDialogConfig();
          this.dialogRef.updatePosition(config.position);
          this.dialogRef.updateSize(config.width, config.height);
        }
      })
    );
  }

  public destroy(): void {
    this.close();
    this.unsubscribe();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  public open(): void {
    if (!this.isHelpDialogOpen) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(HelpDialogComponent, config);
      this.dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe(() => {
          this.isHelpDialogOpen = false;
        });
      this.isHelpDialogOpen = true;
    }
  }

  public close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.isHelpDialogOpen = false;
  }

  public toggle(): void {
    this.isHelpDialogOpen ? this.close() : this.open();
  }

  public isOpen(): boolean {
    return this.isHelpDialogOpen;
  }

  private getDialogConfig() {
    return this._el
      ? this.helpDialogConfigStrategyFactory.create().getConfig(this._el)
      : {};
  }

  private unsubscribe() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}

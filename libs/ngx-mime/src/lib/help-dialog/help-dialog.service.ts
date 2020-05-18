import { ElementRef, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HelpDialogComponent } from './help-dialog.component';
import { HelpDialogConfigStrategyFactory } from './help-dialog-config-strategy-factory';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';

@Injectable()
export class HelpDialogService {
  private _el: ElementRef;
  private isHelpDialogOpen = false;
  private dialogRef: MatDialogRef<HelpDialogComponent>;
  private destroyed: Subject<void> = new Subject();

  constructor(
    private dialog: MatDialog,
    private helpDialogConfigStrategyFactory: HelpDialogConfigStrategyFactory,
    private mimeResizeService: MimeResizeService
  ) {}

  public initialize(): void {
    this.mimeResizeService.onResize
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        if (this.isHelpDialogOpen) {
          const config = this.getDialogConfig();
          this.dialogRef.updatePosition(config.position);
          this.dialogRef.updateSize(config.width, config.height);
        }
      })
  }

  public destroy(): void {
    this.close();
    this.destroyed.next();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  public open(): void {
    if (!this.isHelpDialogOpen) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(HelpDialogComponent, config);
      this.dialogRef.afterClosed().subscribe(() => {
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
    return this.helpDialogConfigStrategyFactory
      .create()
      .getConfig(this._el);
  }
}

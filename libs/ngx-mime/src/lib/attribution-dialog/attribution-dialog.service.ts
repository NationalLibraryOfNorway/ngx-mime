import {
  ElementRef,
  effect,
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
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { AttributionDialogComponent } from './attribution-dialog.component';

@Injectable()
export class AttributionDialogService {
  private readonly dialog = inject(MatDialog);
  private readonly mimeResizeService = inject(MimeResizeService);
  private readonly mimeDomHelper = inject(MimeDomHelper);
  private dialogRef?: MatDialogRef<AttributionDialogComponent>;
  private _el: ElementRef | null = null;
  private _viewContainerRef: ViewContainerRef | undefined;
  private initialized = false;

  constructor() {
    effect(() => {
      const dimensions = this.mimeResizeService.dimensions();

      if (dimensions && this.initialized) {
        this.updateDialogPosition();
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

  public open(timeout?: number): void {
    if (!this.isOpen()) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(AttributionDialogComponent, config);
      this.dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe(() => {
          this.mimeDomHelper.setFocusOnViewer();
        });
      this.closeDialogAfter(timeout);
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

  private closeDialogAfter(seconds: number | undefined) {
    if (seconds && seconds > 0) {
      interval(seconds * 1000)
        .pipe(take(1))
        .subscribe(() => {
          this.close();
        });
    }
  }

  private getDialogConfig(): MatDialogConfig {
    if (!this._viewContainerRef) {
      throw new Error('No viewContainerRef');
    }

    return {
      hasBackdrop: false,
      width: '180px',
      panelClass: ['mime-dialog', 'attribution-panel'],
      position: this.getPosition(),
      autoFocus: true,
      restoreFocus: false,
      viewContainerRef: this._viewContainerRef,
    };
  }

  private getPosition() {
    if (!this._el) {
      throw new Error(`Could not find position because element is missing`);
    }
    const bottomPadding = 80;
    const leftPadding = 20;
    const dimensions = this.mimeDomHelper.getBoundingClientRect(this._el);

    return {
      bottom: `${window.innerHeight - dimensions.bottom + bottomPadding}px`,
      left: `${dimensions.left + leftPadding}px`,
    };
  }

  private updateDialogPosition(): void {
    if (this.isOpen()) {
      const config = this.getDialogConfig();
      this.dialogRef?.updatePosition(config.position);
    }
  }
}

import { Injectable, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { ContentSearchDialogComponent } from './content-search-dialog.component';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { Manifest } from './../core/models/manifest';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ContentSearchDialogService {
  private _el: ElementRef;
  private _isContentSearchDialogOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _hasFocus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private dialogRef: MatDialogRef<ContentSearchDialogComponent>;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private dialog: MatDialog,
    private contentSearchDialogConfigStrategyFactory: ContentSearchDialogConfigStrategyFactory,
    private mimeResizeService: MimeResizeService) { }

  get isContentSearchDialogOpen(): BehaviorSubject<boolean> {
    return this._isContentSearchDialogOpen;
  }

  get hasFocus(): BehaviorSubject<boolean> {
    return this._hasFocus;
  }

  public setHasFocus(hasFocus: boolean): void {
    this._hasFocus.next(hasFocus);
  }

  public initialize(): void {
    this.subscriptions.push(this.mimeResizeService.onResize.subscribe(rect => {
      if (this._isContentSearchDialogOpen.getValue()) {
        const config = this.getDialogConfig();
        this.dialogRef.updatePosition(config.position);
        this.dialogRef.updateSize(config.width, config.height);
      }
    }));
  }

  public destroy() {
    this.close();
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  public open() {
    if (!this._isContentSearchDialogOpen.getValue()) {
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(ContentSearchDialogComponent, config);
      this.dialogRef.afterClosed().subscribe(result => {
        this._isContentSearchDialogOpen.next(false);
      });
      this._isContentSearchDialogOpen.next(true);
    }
  }

  public close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this._isContentSearchDialogOpen.next(false);
  }

  public toggle() {
    this._isContentSearchDialogOpen.getValue() ? this.close() : this.open();
  }

  private getDialogConfig(): MatDialogConfig {
    return this.contentSearchDialogConfigStrategyFactory.create().getConfig(this._el);
  }

}

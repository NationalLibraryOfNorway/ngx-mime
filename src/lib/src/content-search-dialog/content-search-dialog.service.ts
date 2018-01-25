import { Injectable, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { ContentSearchDialogComponent } from './content-search-dialog.component';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { Manifest } from './../core/models/manifest';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContentSearchDialogService {
  private _el: ElementRef;
  private _isContentSearchDialogOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private dialogRef: MatDialogRef<ContentSearchDialogComponent>;
  private destroyed: Subject<void> = new Subject();

  constructor(
    private dialog: MatDialog,
    private contentSearchDialogConfigStrategyFactory: ContentSearchDialogConfigStrategyFactory,
    private mimeResizeService: MimeResizeService) { }

  get isContentSearchDialogOpen(): Observable<boolean> {
    return this._isContentSearchDialogOpen.asObservable();
  }

  public initialize(): void {
    this.mimeResizeService
      .onResize
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe(rect => {
        if (this._isContentSearchDialogOpen.getValue()) {
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

  public isOpen(): boolean {
    return this._isContentSearchDialogOpen.getValue();
  }

  private getDialogConfig(): MatDialogConfig {
    return this.contentSearchDialogConfigStrategyFactory.create().getConfig(this._el);
  }

}

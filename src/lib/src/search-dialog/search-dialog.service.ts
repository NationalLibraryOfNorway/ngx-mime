import { Injectable, ElementRef } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { SearchDialogComponent } from './search-dialog.component';
import { SearchDialogConfigStrategyFactory } from './search-dialog-config-strategy-factory';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { Manifest } from './../core/models/manifest';

@Injectable()
export class SearchDialogService {
  private _el: ElementRef;
  private isSearchDialogOpen = false;
  private dialogRef: MdDialogRef<SearchDialogComponent>;

  constructor(
    private dialog: MdDialog,
    private searchDialogConfigStrategyFactory: SearchDialogConfigStrategyFactory,
    private mimeResizeService: MimeResizeService) {
      mimeResizeService.onResize.subscribe(rect => {
        if (this.isSearchDialogOpen) {
          const config = this.getDialogConfig();
          this.dialogRef.updatePosition(config.position);
          this.dialogRef.updateSize(config.width, config.height);
        }
      });
  }

  public destroy() {
    this.close();
  }

  set el(el: ElementRef) {
    this._el = el;
  }

  public open() {
    if (!this.isSearchDialogOpen) {
      console.log('open');
      const config = this.getDialogConfig();
      this.dialogRef = this.dialog.open(SearchDialogComponent, config);
      this.dialogRef.afterClosed().subscribe(result => {
        this.isSearchDialogOpen = false;
      });
      this.isSearchDialogOpen = true;
    }
  }

  public close() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.isSearchDialogOpen = false;
    }
    this.isSearchDialogOpen = false;
  }

  public toggle() {
    this.isSearchDialogOpen ? this.close() : this.open();
  }

  private getDialogConfig(): MdDialogConfig {
    return this.searchDialogConfigStrategyFactory.create().getConfig(this._el);
  }

}

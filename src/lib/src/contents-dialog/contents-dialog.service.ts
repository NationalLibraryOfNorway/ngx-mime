import { Injectable, ElementRef } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { ContentsComponent } from './contents-dialog.component';
import { Manifest } from './../core/models/manifest';

@Injectable()
export class ContentsDialogService {
  private _manifest: Manifest;
  private _el: ElementRef;
  private isContentsDialogOpen = false;
  private dialogRef: MdDialogRef<ContentsComponent>;

  constructor(
    public dialog: MdDialog,
    private media: ObservableMedia) { }

  set manifest(manifest: Manifest) {
    this._manifest = manifest;
  }

  set elementRef(el: ElementRef) {
    this._el = el;
  }

  public open() {
    let config: MdDialogConfig;
    if (!this.isContentsDialogOpen) {
      if (this.media.isActive('xs')) {
        config = this.getMobileContensConfig();
      } else {
        config = this.getDesktopContensConfig();
      }

      this.dialogRef = this.dialog.open(ContentsComponent, config);
      this.dialogRef.afterClosed().subscribe(result => {
        this.isContentsDialogOpen = false;
      });
      this.isContentsDialogOpen = true;
    }

  }

  public close() {
    this.dialogRef.close();
  }

  public toggle() {
    this.isContentsDialogOpen ? this.close() : this.open();
  }

  private getMobileContensConfig(): MdDialogConfig {
    return {
      width: '100%',
      height: '100%',
      data: this._manifest
    };
  }

  private getDesktopContensConfig(): MdDialogConfig {
    const rect = this._el.nativeElement.getBoundingClientRect();
    let left = rect.right - 370;
    let top = rect.top + 64;
    return {
      hasBackdrop: false,
      disableClose: true,
      width: '350px',
      height: '600px',
      position: {
        top: top + 'px',
        left: left + 'px',
      },
      data: this._manifest
    };
  }

}

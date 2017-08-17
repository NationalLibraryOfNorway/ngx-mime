import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { MdDialog, MdDialogConfig, DialogPosition } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../viewer-intl';
import { Manifest } from './../../core/models/manifest';
import { ContentsComponent } from './../contents/contents.component';

@Component({
  selector: 'mime-viewer-header',
  templateUrl: './viewer-header.component.html',
  styleUrls: ['./viewer-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerHeaderComponent implements OnInit, OnDestroy {
  @Input() manifest: Manifest;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MdDialog,
    public intl: MimeViewerIntl) { }

  ngOnInit() {
    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public openContents() {
    const config: MdDialogConfig = {
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'contents',
      position: {
        top: '20px',
        right: '20px'
      },
      data: this.manifest
    };

    this.dialog.open(ContentsComponent, config);
  }

}

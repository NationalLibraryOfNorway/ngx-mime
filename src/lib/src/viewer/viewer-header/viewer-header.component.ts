import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, Input, Renderer2, ElementRef } from '@angular/core';
import { MdDialog, MdDialogConfig, DialogPosition } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../viewer-intl';
import { Manifest } from './../../core/models/manifest';
import { ContentsComponent } from './../../contents-dialog/contents-dialog.component';
import { ContentsDialogService } from './../../contents-dialog/contents-dialog.service';

@Component({
  selector: 'mime-viewer-header',
  templateUrl: './viewer-header.component.html',
  styleUrls: ['./viewer-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerHeaderComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private contentsDialogService: ContentsDialogService) { }

  ngOnInit() {
    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public openContents() {
    this.contentsDialogService.toggle();
  }

}

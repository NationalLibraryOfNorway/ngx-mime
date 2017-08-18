import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, Input, Renderer2, ElementRef } from '@angular/core';
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
    public dialog: MdDialog,
    public intl: MimeViewerIntl,
    private renderer: Renderer2,
    private el: ElementRef,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public openContents() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    let left = rect.right - 370;
    let top = rect.top + 64;
    const config: MdDialogConfig = {
      hasBackdrop: false,
      disableClose: true,
      width: '350px',
      position: {
        top: top + 'px',
        left: left + 'px',
      },
      data: this.manifest
    };

    this.dialog.open(ContentsComponent, config);
  }

}

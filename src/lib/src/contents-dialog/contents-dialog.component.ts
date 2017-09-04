import { Component, OnInit, Optional, Inject, HostListener, ChangeDetectionStrategy, ElementRef, OnDestroy } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../core/viewer-intl';
import { Manifest } from './../core/models/manifest';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { MimeDomHelper } from './../core/mime-dom-helper';
import { Dimensions } from './../core/models/dimensions';

@Component({
  selector: 'mime-contents',
  templateUrl: './contents-dialog.component.html',
  styleUrls: ['./contents-dialog.component.scss']
})
export class ContentsDialogComponent implements OnInit, OnDestroy {
  public tabHeight = {};
  private mimeHeight = 0;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public intl: MimeViewerIntl,
    public media: ObservableMedia,
    private mimeResizeService: MimeResizeService,
    private el: ElementRef) {
    mimeResizeService.onResize.subscribe((dimensions: Dimensions) => {
      this.mimeHeight = dimensions.height;
      this.resizeTabHeight();
    });

  }

  ngOnInit() {
    this.resizeTabHeight();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeTabHeight();
  }

  private resizeTabHeight(): void {
    const dimensions = new MimeDomHelper().getBoundingClientRect(this.el);
    let height = this.mimeHeight;

    if (this.media.isActive('lt-md')) {
      height -= 104;
      this.tabHeight = {
        'maxHeight': window.innerHeight - 128 + 'px'
      };
    } else {
      height -= 208;
      this.tabHeight = {
        'maxHeight': height + 'px'
      };
    }
  }
}

import { Component, OnInit, Optional, Inject, HostListener, ChangeDetectionStrategy, ElementRef, OnDestroy } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../core/viewer-intl';
import { Manifest } from './../core/models/manifest';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { Rect } from './../core/models/rect';

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
    mimeResizeService.onResize.subscribe((r: Rect) => {
      this.mimeHeight = r.height;
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
    const rect = this.el.nativeElement.getBoundingClientRect();
    let height = this.mimeHeight - rect.top;

    if (this.media.isActive('lt-md')) {
      height -= 20;
    } else {
      height -= 60;
    }
    this.tabHeight = {
      'maxHeight': height + 'px'
    };
  }
}

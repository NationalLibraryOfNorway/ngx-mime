import { Component, OnInit, Optional, Inject, HostListener, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../core/viewer-intl';
import { Manifest } from './../core/models/manifest';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { Rect } from './../core/mime-resize-service/mime-resize.service';

@Component({
  selector: 'mime-contents',
  templateUrl: './contents-dialog.component.html',
  styleUrls: ['./contents-dialog.component.scss']
})
export class ContentsDialogComponent implements OnInit {
  public tabHeight = {};
  private maxHeight = 460;

  constructor(
    public intl: MimeViewerIntl,
    public media: ObservableMedia,
    private resizeService: MimeResizeService,
    private el: ElementRef) {
    resizeService.onResize.subscribe((r: Rect) => {
      this.maxHeight = r.height;
      this.resizeTabHeight();
    });

  }

  ngOnInit() {
    this.resizeTabHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeTabHeight();
  }

  private resizeTabHeight(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    let height = document.body.scrollHeight - rect.top;

    if (this.media.isActive('lt-md')) {
      height -= 130;
    } else {
      height -= 170;
    }
    height = height > this.maxHeight ? this.maxHeight : height;
    this.tabHeight = {
      'maxHeight': height + 'px'
    };
  }
}

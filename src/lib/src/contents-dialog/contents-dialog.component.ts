import { Component, OnInit, HostListener, ElementRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { Dimensions } from '../core/models/dimensions';

@Component({
  selector: 'mime-contents',
  templateUrl: './contents-dialog.component.html',
  styleUrls: ['./contents-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentsDialogComponent implements OnInit, OnDestroy {
  public tabHeight = {};
  private mimeHeight = 0;
  private destroyed: Subject<void> = new Subject();

  constructor(
    public intl: MimeViewerIntl,
    public media: ObservableMedia,
    private mimeResizeService: MimeResizeService,
    private el: ElementRef,
    private mimeDomHelper: MimeDomHelper) {
      mimeResizeService
        .onResize
        .pipe(
          takeUntil(this.destroyed)
        ).subscribe((dimensions: Dimensions) => {
          this.mimeHeight = dimensions.height;
          this.resizeTabHeight();
        });
  }

  ngOnInit() {
    this.resizeTabHeight();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeTabHeight();
  }

  private resizeTabHeight(): void {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
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

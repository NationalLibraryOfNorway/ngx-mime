import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Dimensions } from '../core/models/dimensions';

@Component({
  selector: 'mime-help',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
})
export class HelpDialogComponent implements OnInit, OnDestroy {
  public tabHeight = {};
  private mimeHeight = 0;
  private subscriptions = new Subscription();

  constructor(
    public mediaObserver: MediaObserver,
    public intl: MimeViewerIntl,
    private mimeResizeService: MimeResizeService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.mimeResizeService.onResize.subscribe((dimensions: Dimensions) => {
        this.mimeHeight = dimensions.height;
        this.resizeTabHeight();
      })
    );

    this.resizeTabHeight();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private resizeTabHeight() {
    let height = this.mimeHeight;

    if (this.mediaObserver.isActive('lt-md')) {
      this.tabHeight = {
        maxHeight: window.innerHeight - 128 + 'px',
      };
    } else {
      height -= 272;
      this.tabHeight = {
        maxHeight: height + 'px',
      };
    }
  }
}

import { Component, ElementRef, OnDestroy, OnInit } from "@angular/core";
import { MediaObserver } from "@angular/flex-layout";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MimeViewerIntl } from "../core/intl/viewer-intl";
import { MimeResizeService } from "../core/mime-resize-service/mime-resize.service";
import { Dimensions } from "../core/models/dimensions";
import { MimeDomHelper } from "../core/mime-dom-helper";

@Component({
  selector: 'mime-help',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent implements OnInit, OnDestroy {
  public tabHeight= {};
  private mimeHeight = 0;
  private destroyed: Subject<void> = new Subject();

  constructor(
    public mediaObserver: MediaObserver,
    public intl: MimeViewerIntl,
    private mimeDomHelper: MimeDomHelper,
    private el: ElementRef,
    private mimeResizeService: MimeResizeService
  ) {}

  ngOnInit(): void {
    this.mimeResizeService.onResize
      .pipe(takeUntil(this.destroyed))
      .subscribe((dimensions: Dimensions) => {
        this.mimeHeight = dimensions.height;
        this.resizeTabHeight();
      });

    this.resizeTabHeight();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  private resizeTabHeight() {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
    let height = this.mimeHeight;

    if (this.mediaObserver.isActive('lt-md')) {
      this.tabHeight = {
        maxHeight: window.innerHeight - 128 + 'px'
      };
    } else {
      height -= 272;
      this.tabHeight = {
        maxHeight: height + 'px'
      };
    }
  }

}

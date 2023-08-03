import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Dimensions } from '../core/models/dimensions';

@Component({
  selector: 'mime-help',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
})
export class HelpDialogComponent implements OnInit, OnDestroy {
  public tabHeight = {};
  isHandsetOrTabletInPortrait = false;
  private mimeHeight = 0;
  private subscriptions = new Subscription();

  constructor(
    public intl: MimeViewerIntl,
    private cdr: ChangeDetectorRef,
    private mimeResizeService: MimeResizeService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
        .subscribe(
          (value: BreakpointState) =>
            (this.isHandsetOrTabletInPortrait = value.matches)
        )
    );

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

    if (this.isHandsetOrTabletInPortrait) {
      this.tabHeight = {
        maxHeight: window.innerHeight - 128 + 'px',
      };
    } else {
      height -= 272;
      this.tabHeight = {
        maxHeight: height + 'px',
      };
    }
    this.cdr.detectChanges();
  }
}

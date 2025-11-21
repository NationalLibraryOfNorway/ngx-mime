import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { NgStyle } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Dimensions } from '../core/models/dimensions';

@Component({
  selector: 'mime-help',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
  imports: [
    MatToolbar,
    MatIconButton,
    MatTooltip,
    MatDialogClose,
    MatIcon,
    MatDialogTitle,
    MatDialogContent,
    NgStyle,
  ],
})
export class HelpDialogComponent implements OnInit, OnDestroy {
  intl = inject(MimeViewerIntl);
  tabHeight = {};
  isHandsetOrTabletInPortrait = false;
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly mimeResizeService = inject(MimeResizeService);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private mimeHeight = 0;
  private readonly subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
        .subscribe(
          (value: BreakpointState) =>
            (this.isHandsetOrTabletInPortrait = value.matches),
        ),
    );

    this.subscriptions.add(
      this.mimeResizeService.onResize.subscribe((dimensions: Dimensions) => {
        this.mimeHeight = dimensions.height;
        this.resizeTabHeight();
      }),
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
      height -= 220;
      this.tabHeight = {
        maxHeight: height + 'px',
      };
    }
    this.cdr.detectChanges();
  }
}

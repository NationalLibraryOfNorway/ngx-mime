import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Dimensions } from './../../core/models/dimensions';
import { MimeResizeService } from './../../core/mime-resize-service/mime-resize.service';

@Component({
  selector: 'mime-osd-toolbar',
  templateUrl: './osd-toolbar.component.html',
  styleUrls: ['./osd-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OsdToolbarComponent implements OnInit, OnDestroy {
  public osdToolbarStyle = {};
  private subscriptions: Array<Subscription> = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private mimeService: MimeResizeService) { }

  ngOnInit() {
    this.mimeService.onResize.subscribe((dimensions: Dimensions) => {
      this.osdToolbarStyle = {
        'top': (dimensions.top + 110) + 'px'
      };
      this.changeDetectorRef.detectChanges();
    });

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}

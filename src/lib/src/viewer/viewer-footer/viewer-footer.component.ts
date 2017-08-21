import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdSliderChange } from '@angular/material';
import { MimeViewerIntl } from './../viewer-intl';

@Component({
  selector: 'viewer-footer',
  templateUrl: './viewer-footer.component.html',
  styleUrls: ['./viewer-footer.component.scss']
})
export class ViewerFooterComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}

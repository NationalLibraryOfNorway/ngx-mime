import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdSliderChange } from '@angular/material';
import { MimeViewerIntl } from './../viewer-intl';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'viewer-footer',
  templateUrl: './viewer-footer.component.html',
  styleUrls: ['./viewer-footer.component.scss'],
  animations: [
    trigger('footerState', [
      state('hide', style({
        opacity: 0,
        display: 'none',
        transform: 'translate(0, 100%)'
      })),
      state('show', style({
        opacity: 1,
        display: 'block',
        transform: 'translate(0, 0)'
      })),
      transition('hide => show', animate('300ms ease-in')),
      transition('show => hide', animate('300ms ease-out'))
    ])
  ]
})
export class ViewerFooterComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];
  public state = 'hide';

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

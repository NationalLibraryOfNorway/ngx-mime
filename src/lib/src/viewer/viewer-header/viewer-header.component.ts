import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MimeViewerIntl } from './../viewer-intl';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'viewer-header',
  templateUrl: './viewer-header.component.html',
  styleUrls: ['./viewer-header.component.scss'],
  animations: [
    trigger('headerState', [
      state('hide', style({
        opacity: 0,
        display: 'none',
        transform: 'translate3d(0, -100%, 0)'

      })),
      state('show',   style({
        opacity: 1,
        display: 'block',
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('hide => show', animate('300ms ease-in')),
      transition('show => hide', animate('300ms ease-out'))
    ])
  ]
})
export class ViewerHeaderComponent implements OnInit, OnDestroy {
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

import { OptionsTransitions } from '../../core/models/options-transitions';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, OnChanges, ChangeDetectorRef, Input, Renderer2, ElementRef } from '@angular/core';
import { MdDialog, MdDialogConfig, DialogPosition } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../../core/viewer-intl';
import { Manifest } from './../../core/models/manifest';
import { ContentsDialogComponent } from './../../contents-dialog/contents-dialog.component';
import { ContentsDialogService } from './../../contents-dialog/contents-dialog.service';

@Component({
  selector: 'mime-viewer-header',
  templateUrl: './viewer-header.component.html',
  styleUrls: ['./viewer-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('headerState', [
      state('hide', style({
        opacity: 0,
        display: 'none',
        transform: 'translate(0, -100%)'

      })),
      state('show', style({
        opacity: 1,
        display: 'block',
        transform: 'translate(0, 0)'
      })),
      transition('hide => show', animate(OptionsTransitions.TIME_IN_MILLIS + 'ms ease-in')),
      transition('show => hide', animate(OptionsTransitions.TIME_IN_MILLIS + 'ms ease-out'))
    ])
  ],
  host: {
    '[@headerState]': 'state'
  }
})
export class ViewerHeaderComponent implements OnInit, OnDestroy, OnChanges {
  private subscriptions: Array<Subscription> = [];
  public state = 'show';

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private contentsDialogService: ContentsDialogService) { }

  ngOnInit() {
    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
  }

  ngOnChanges() {
    console.log('changes!', this.state);
  }

  toggleState() {
    this.state = this.state === 'hide' ? 'show' : 'hide';
    console.log('toggled state', this.state);

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public openContents() {
    this.contentsDialogService.toggle();
  }

}

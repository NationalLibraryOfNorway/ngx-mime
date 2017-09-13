import { OptionsTransitions } from '../../core/models/options-transitions';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, Input, Renderer2, ElementRef } from '@angular/core';
import { MdDialog, MdDialogConfig, DialogPosition } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../../core/viewer-intl';
import { Manifest } from './../../core/models/manifest';
import { ContentsDialogComponent } from './../../contents-dialog/contents-dialog.component';
import { ContentsDialogService } from './../../contents-dialog/contents-dialog.service';
import { SearchDialogService } from './../../search-dialog/search-dialog.service';
import { MimeDomHelper } from '../../core/mime-dom-helper';
import { FullscreenService } from './../../core/fullscreen-service/fullscreen.service';

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
      transition('hide => show', animate(OptionsTransitions.TOOLBARS + 'ms ease-in')),
      transition('show => hide', animate(OptionsTransitions.TOOLBARS + 'ms ease-out'))
    ])
  ],
  host: {
    '[@headerState]': 'state'
  }
})
export class ViewerHeaderComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];
  public state = 'show';
  isFullscreenEnabled = false;

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private contentsDialogService: ContentsDialogService,
    private searchDialogService: SearchDialogService,
    private fullscreenService: FullscreenService) { }

  ngOnInit() {
    this.isFullscreenEnabled = this.fullscreenService.isEnabled();

    this.subscriptions.push(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));

    this.subscriptions.push(this.fullscreenService.onChange.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    }));

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public toggleContents() {
    this.contentsDialogService.toggle();
  }

  public toggleSearch() {
    this.searchDialogService.toggle();
  }

  public toggleFullscreen(): void {
    return new MimeDomHelper().toggleFullscreen();
  }

  public isInFullScreen(): boolean {
    return this.fullscreenService.isFullscreen();
  }

}

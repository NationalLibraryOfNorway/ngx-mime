import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { IiifContentSearchService } from './../../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from './../../core/models/search-result';
import { ViewerOptions } from '../../core/models/viewer-options';

@Component({
  selector: 'mime-viewer-footer',
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
      transition('hide => show', animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')),
      transition('show => hide', animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out'))
    ])
  ],
  host: {
    '[@footerState]': 'state'
  }
})
export class ViewerFooterComponent implements OnInit, OnDestroy {
  @ViewChild('mimeFooterBefore', {read: ViewContainerRef}) mimeFooterBefore: ViewContainerRef;
  @ViewChild('mimeFooterAfter', {read: ViewContainerRef}) mimeFooterAfter: ViewContainerRef;
  public state = 'hide';
  public showNavigationToolbar = true;
  public searchResult: SearchResult = new SearchResult();
  public showPageNavigator = true;
  public showContentSearchNavigator = false;
  private destroyed: Subject<void> = new Subject();
  private mediaSubscription: Subscription;

  constructor(
    private iiifContentSearchService: IiifContentSearchService,
    public media: ObservableMedia,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.iiifContentSearchService.onChange
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe((sr: SearchResult) => {
        this.searchResult = sr;
        this.showContentSearchNavigator = this.searchResult.size() > 0;
        this.showPageNavigator = this.searchResult.size() === 0 || !this.isMobile();
        this.changeDetectorRef.detectChanges();
      });

      this.mediaSubscription = this.media.subscribe((change: MediaChange) => {
      this.showPageNavigator = this.searchResult.size() === 0 || !this.isMobile();
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
    this.mediaSubscription.unsubscribe();
  }

  private isMobile(): boolean {
    return this.media.isActive('lt-md');
  }
}

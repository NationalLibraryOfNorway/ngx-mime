import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewerOptions } from '../../core/models/viewer-options';
import { IiifContentSearchService } from './../../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from './../../core/models/search-result';

@Component({
  selector: 'mime-viewer-footer',
  templateUrl: './viewer-footer.component.html',
  styleUrls: ['./viewer-footer.component.scss'],
  animations: [
    trigger('footerState', [
      state(
        'hide',
        style({
          transform: 'translate(0, 100%)'
        })
      ),
      state(
        'show',
        style({
          transform: 'translate(0, 0)'
        })
      ),
      transition(
        'hide => show',
        animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in')
      ),
      transition(
        'show => hide',
        animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out')
      )
    ])
  ]
})
export class ViewerFooterComponent implements OnInit, OnDestroy {
  @ViewChild('mimeFooterBefore', { read: ViewContainerRef, static: true })
  mimeFooterBefore: ViewContainerRef;
  @ViewChild('mimeFooterAfter', { read: ViewContainerRef, static: true })
  mimeFooterAfter: ViewContainerRef;
  public state = 'hide';
  public showNavigationToolbar = true;
  public searchResult: SearchResult = new SearchResult();
  public showPageNavigator = true;
  public showContentSearchNavigator = false;
  private destroyed: Subject<void> = new Subject();
  private mediaSubscription: Subscription;

  constructor(
    private iiifContentSearchService: IiifContentSearchService,
    public mediaObserver: MediaObserver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  @HostBinding('@footerState')
  get footerState() {
    return this.state;
  }

  ngOnInit() {
    this.iiifContentSearchService.onChange
      .pipe(takeUntil(this.destroyed))
      .subscribe((sr: SearchResult) => {
        this.searchResult = sr;
        this.showContentSearchNavigator = this.searchResult.size() > 0;
        this.showPageNavigator =
          this.searchResult.size() === 0 || !this.isMobile();
        this.changeDetectorRef.detectChanges();
      });

    this.mediaSubscription = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        this.showPageNavigator =
          this.searchResult.size() === 0 || !this.isMobile();
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
    this.mediaSubscription.unsubscribe();
  }

  private isMobile(): boolean {
    return this.mediaObserver.isActive('lt-md');
  }
}

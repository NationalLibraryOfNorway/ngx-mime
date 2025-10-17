import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewerOptions } from '../../core/models/viewer-options';
import { IiifContentSearchService } from './../../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from './../../core/models/search-result';
import { MatDivider } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { ContentSearchNavigatorComponent } from './content-search-navigator/content-search-navigator.component';
import { NgClass } from '@angular/common';
import { CanvasGroupNavigatorComponent } from './canvas-group-navigator/canvas-group-navigator.component';

@Component({
  selector: 'mime-viewer-footer',
  templateUrl: './viewer-footer.component.html',
  styleUrls: ['./viewer-footer.component.scss'],
  animations: [
    trigger('footerState', [
      state(
        'hide',
        style({
          transform: 'translate(0, 100%)',
        }),
      ),
      state(
        'show',
        style({
          transform: 'translate(0, 0)',
        }),
      ),
      transition(
        'hide => show',
        animate(ViewerOptions.transitions.toolbarsEaseInTime + 'ms ease-in'),
      ),
      transition(
        'show => hide',
        animate(ViewerOptions.transitions.toolbarsEaseOutTime + 'ms ease-out'),
      ),
    ]),
  ],
  imports: [
    MatDivider,
    MatToolbar,
    ContentSearchNavigatorComponent,
    NgClass,
    CanvasGroupNavigatorComponent,
  ],
})
export class ViewerFooterComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private iiifContentSearchService = inject(IiifContentSearchService);

  @ViewChild('mimeFooterBefore', { read: ViewContainerRef, static: true })
  mimeFooterBefore!: ViewContainerRef;
  @ViewChild('mimeFooterAfter', { read: ViewContainerRef, static: true })
  mimeFooterAfter!: ViewContainerRef;

  public state = 'hide';
  public showNavigationToolbar = true;
  public searchResult: SearchResult = new SearchResult();
  public showPageNavigator = true;
  public showContentSearchNavigator = false;

  private subscriptions = new Subscription();

  @HostBinding('@footerState')
  get footerState() {
    return this.state;
  }

  ngOnInit() {
    this.setupContentSearchObserver();
    this.setupBreakpointObserver();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private setupContentSearchObserver() {
    this.subscriptions.add(
      this.iiifContentSearchService.onChange.subscribe((sr: SearchResult) => {
        this.searchResult = sr;
        this.showContentSearchNavigator = this.searchResult.size() > 0;
        this.updateShowPageNavigator();
        this.changeDetectorRef.detectChanges();
      }),
    );
  }

  private setupBreakpointObserver() {
    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.XSmall])
        .subscribe((value: BreakpointState) => {
          this.showPageNavigator = value.matches
            ? this.searchResult.size() === 0
            : true;
          this.changeDetectorRef.detectChanges();
        }),
    );
  }

  private updateShowPageNavigator() {
    this.showPageNavigator =
      this.searchResult.size() === 0 || !this.isHandsetPortrait();
  }

  private isHandsetPortrait(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.HandsetPortrait);
  }
}

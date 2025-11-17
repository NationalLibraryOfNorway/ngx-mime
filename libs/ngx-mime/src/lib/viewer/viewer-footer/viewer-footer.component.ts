import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDivider } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { Subscription } from 'rxjs';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { SearchResult } from '../../core/models/search-result';
import { CanvasGroupNavigatorComponent } from './canvas-group-navigator/canvas-group-navigator.component';
import { ContentSearchNavigatorComponent } from './content-search-navigator/content-search-navigator.component';

@Component({
  selector: 'mime-viewer-footer',
  templateUrl: './viewer-footer.component.html',
  styleUrls: ['./viewer-footer.component.scss'],
  imports: [
    MatDivider,
    MatToolbar,
    ContentSearchNavigatorComponent,
    NgClass,
    CanvasGroupNavigatorComponent,
  ],
})
export class ViewerFooterComponent implements OnInit, OnDestroy {
  @ViewChild('mimeFooterBefore', { read: ViewContainerRef, static: true })
  mimeFooterBefore!: ViewContainerRef;
  @ViewChild('mimeFooterAfter', { read: ViewContainerRef, static: true })
  mimeFooterAfter!: ViewContainerRef;
  searchResult: SearchResult = new SearchResult();
  showPageNavigator = true;
  showContentSearchNavigator = false;
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly iiifContentSearchService = inject(IiifContentSearchService);
  private readonly subscriptions = new Subscription();

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

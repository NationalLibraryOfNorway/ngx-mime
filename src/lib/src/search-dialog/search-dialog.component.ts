import { Component, OnInit, Optional, Inject, HostListener, ChangeDetectionStrategy, ElementRef, OnDestroy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../core/viewer-intl';
import { Manifest } from './../core/models/manifest';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { MimeDomHelper } from './../core/mime-dom-helper';
import { Dimensions } from './../core/models/dimensions';
import { SearchResult } from './../core/models/search-result';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { ViewerService } from './../core/viewer-service/viewer.service';
import { Hit } from './../core/models/search-result';

@Component({
  selector: 'mime-search',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit, OnDestroy {
  public q: string;
  public hits: Hit[] = [];
  public currentSearch = '';
  public numberOfHits = 0;
  public isSearching = false;
  public tabHeight = {};
  private manifest: Manifest;
  private mimeHeight = 0;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public dialogRef: MdDialogRef<SearchDialogComponent>,
    public intl: MimeViewerIntl,
    public media: ObservableMedia,
    private mimeResizeService: MimeResizeService,
    private iiifManifestService: IiifManifestService,
    private iiifContentSearchService: IiifContentSearchService,
    private viewerService: ViewerService,
    private el: ElementRef) {
    this.subscriptions.push(mimeResizeService.onResize.subscribe((dimensions: Dimensions) => {
      this.mimeHeight = dimensions.height;
      this.resizeTabHeight();
    }));

    this.subscriptions.push(this.iiifManifestService.currentManifest
      .subscribe((manifest: Manifest) => {
        this.manifest = manifest;
      }));

    this.subscriptions.push(iiifContentSearchService.currentSearchResult.subscribe((sr: SearchResult) => {
      this.hits = sr.hits;
      this.numberOfHits = sr.size();
    }));

    this.subscriptions.push(iiifContentSearchService.isSearching.subscribe((s: boolean) => {
      this.isSearching = s;
    }));

  }

  ngOnInit() {
    this.resizeTabHeight();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeTabHeight();
  }

  onSubmit() {
    this.currentSearch = this.q;
    this.iiifContentSearchService.search(this.manifest, this.q);
  }

  goToHit(hit: Hit): void {
    this.viewerService.goToPage(hit.index);
    if (this.media.isActive('lt-md')) {
      this.dialogRef.close();
    }
  }

  private resizeTabHeight(): void {
    const dimensions = new MimeDomHelper().getBoundingClientRect(this.el);
    let height = this.mimeHeight;

    if (this.media.isActive('lt-md')) {
      height -= 104;
      this.tabHeight = {
        'maxHeight': window.innerHeight - 128 + 'px'
      };
    } else {
      height -= 208;
      this.tabHeight = {
        'maxHeight': height + 'px'
      };
    }
  }
}

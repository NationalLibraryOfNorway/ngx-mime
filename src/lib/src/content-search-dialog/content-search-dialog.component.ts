import {
  Component,
  OnInit,
  Optional,
  Inject,
  HostListener,
  ChangeDetectionStrategy,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewChildren,
  QueryList
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators/filter';
import { take } from 'rxjs/operators/take';

import { MimeViewerIntl } from './../core/intl/viewer-intl';
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
  templateUrl: './content-search-dialog.component.html',
  styleUrls: ['./content-search-dialog.component.scss']
})
export class ContentSearchDialogComponent implements OnInit, OnDestroy {
  public q: string;
  public hits: Hit[] = [];
  public currentHit: Hit;
  public currentSearch = '';
  public numberOfHits = 0;
  public isSearching = false;
  public tabHeight = {};
  private manifest: Manifest;
  private mimeHeight = 0;
  private subscriptions = new Subscription();
  @ViewChild('contentSearchResult') resultContainer: ElementRef;
  @ViewChildren('hitButton', { read: ElementRef }) hitList: QueryList<ElementRef>;

  constructor(
    public dialogRef: MatDialogRef<ContentSearchDialogComponent>,
    public intl: MimeViewerIntl,
    public media: ObservableMedia,
    private mimeResizeService: MimeResizeService,
    private iiifManifestService: IiifManifestService,
    private iiifContentSearchService: IiifContentSearchService,
    private viewerService: ViewerService,
    private el: ElementRef,
    private mimeDomHelper: MimeDomHelper) { }

  ngOnInit() {
    this.subscriptions.add(this.mimeResizeService.onResize.subscribe((dimensions: Dimensions) => {
      this.mimeHeight = dimensions.height;
      this.resizeTabHeight();
    }));

    this.subscriptions.add(this.iiifManifestService.currentManifest
      .subscribe((manifest: Manifest) => {
        this.manifest = manifest;
      }));

    this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((sr: SearchResult) => {
      this.hits = sr.hits;
      this.currentSearch = sr.q ? sr.q : '';
      this.q = sr.q;
      this.numberOfHits = sr.size();
      if (this.resultContainer && this.numberOfHits > 0) {
        this.resultContainer.nativeElement.focus();
      }
    }));

    this.subscriptions.add(this.iiifContentSearchService.isSearching.subscribe((s: boolean) => {
      this.isSearching = s;
    }));

    this.subscriptions.add(this.iiifContentSearchService.onSelected
      .subscribe((hit: Hit) => {
        if (hit === null) {
          this.currentHit = hit;
        } else {
          if (!this.currentHit || this.currentHit.id !== hit.id) {
            this.currentHit = hit;
            this.scrollCurrentHitIntoView();
          }
        }
      }));

    this.resizeTabHeight();
  }

  ngAfterViewInit() {
    this.scrollCurrentHitIntoView();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
    this.currentHit = hit;
    this.iiifContentSearchService.selected(hit);
    if (this.media.isActive('lt-md')) {
      this.dialogRef.close();
    }
  }

  private resizeTabHeight(): void {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
    let height = this.mimeHeight;

    if (this.media.isActive('lt-md')) {
      this.tabHeight = {
        'maxHeight': window.innerHeight - 128 + 'px'
      };
    } else {
      height -= 272;
      this.tabHeight = {
        'maxHeight': height + 'px'
      };
    }
  }

  private scrollCurrentHitIntoView() {
    this.iiifContentSearchService.onSelected
      .pipe(
        take(1),
        filter(s => s !== null)
      ).subscribe((hit: Hit) => {
        const selected = this.findSelected(hit);
        if (selected) {
          // Browser compatibility: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
          try {
            selected.nativeElement.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });
          } catch (e) {
            try {
              selected.nativeElement.scrollIntoView();
            } catch (e) {}
          }
        }
      });
  }

  private findSelected(selectedHit: Hit): ElementRef {
    if (this.hitList) {
      const selectedList = this.hitList.filter((item: ElementRef, index: number) => index === selectedHit.id);
      return selectedList.length > 0 ? selectedList[0] : null;
    } else {
      return null;
    }

  }

}

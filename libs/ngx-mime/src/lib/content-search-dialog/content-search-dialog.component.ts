import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../core/intl/viewer-intl';
import { MimeDomHelper } from './../core/mime-dom-helper';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { Dimensions } from './../core/models/dimensions';
import { Hit } from './../core/models/hit';
import { Manifest } from './../core/models/manifest';
import { SearchResult } from './../core/models/search-result';

@Component({
  selector: 'mime-search',
  templateUrl: './content-search-dialog.component.html',
  styleUrls: ['./content-search-dialog.component.scss']
})
export class ContentSearchDialogComponent
  implements OnInit, AfterViewInit, OnDestroy {
  public q: string;
  public hits: Hit[] = [];
  public currentHit: Hit;
  public currentSearch = '';
  public numberOfHits = 0;
  public isSearching = false;
  public tabHeight = {};
  private manifest: Manifest;
  private mimeHeight = 0;
  private destroyed: Subject<void> = new Subject();
  @ViewChild('contentSearchResult') resultContainer: ElementRef;
  @ViewChild('query') qEl: ElementRef;
  @ViewChildren('hitButton', { read: ElementRef })
  hitList: QueryList<ElementRef>;

  constructor(
    public dialogRef: MatDialogRef<ContentSearchDialogComponent>,
    public intl: MimeViewerIntl,
    public mediaObserver: MediaObserver,
    private mimeResizeService: MimeResizeService,
    private iiifManifestService: IiifManifestService,
    private iiifContentSearchService: IiifContentSearchService,
    private el: ElementRef,
    private mimeDomHelper: MimeDomHelper
  ) {}

  ngOnInit() {
    this.mimeResizeService.onResize
      .pipe(takeUntil(this.destroyed))
      .subscribe((dimensions: Dimensions) => {
        this.mimeHeight = dimensions.height;
        this.resizeTabHeight();
      });

    this.iiifManifestService.currentManifest
      .pipe(takeUntil(this.destroyed))
      .subscribe((manifest: Manifest) => {
        this.manifest = manifest;
      });

    this.iiifContentSearchService.onChange
      .pipe(takeUntil(this.destroyed))
      .subscribe((sr: SearchResult) => {
        this.hits = sr.hits;
        this.currentSearch = sr.q ? sr.q : '';
        this.q = sr.q;
        this.numberOfHits = sr.size();
        if (this.resultContainer !== null && this.numberOfHits > 0) {
          this.resultContainer.nativeElement.focus();
        } else if (this.q.length === 0 || this.numberOfHits === 0) {
          this.qEl.nativeElement.focus();
        }
      });

    this.iiifContentSearchService.isSearching
      .pipe(takeUntil(this.destroyed))
      .subscribe((s: boolean) => {
        this.isSearching = s;
      });

    this.iiifContentSearchService.onSelected
      .pipe(takeUntil(this.destroyed))
      .subscribe((hit: Hit) => {
        if (hit === null) {
          this.currentHit = hit;
        } else {
          if (!this.currentHit || this.currentHit.id !== hit.id) {
            this.currentHit = hit;
            this.scrollCurrentHitIntoView();
          }
        }
      });

    this.resizeTabHeight();
  }

  ngAfterViewInit() {
    this.scrollCurrentHitIntoView();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeTabHeight();
  }

  onSubmit(event: KeyboardEvent) {
    event.preventDefault();
    this.search();
  }

  clear() {
    this.q = '';
    this.search();
  }

  goToHit(hit: Hit): void {
    this.currentHit = hit;
    this.iiifContentSearchService.selected(hit);
    if (this.mediaObserver.isActive('lt-md')) {
      this.dialogRef.close();
    }
  }

  private search() {
    this.currentSearch = this.q;
    this.iiifContentSearchService.search(this.manifest, this.q);
  }

  private resizeTabHeight(): void {
    const dimensions = this.mimeDomHelper.getBoundingClientRect(this.el);
    let height = this.mimeHeight;

    if (this.mediaObserver.isActive('lt-md')) {
      this.tabHeight = {
        maxHeight: window.innerHeight - 128 + 'px'
      };
    } else {
      height -= 272;
      this.tabHeight = {
        maxHeight: height + 'px'
      };
    }
  }

  private scrollCurrentHitIntoView() {
    this.iiifContentSearchService.onSelected
      .pipe(
        take(1),
        filter(s => s !== null)
      )
      .subscribe((hit: Hit) => {
        const selected = this.findSelected(hit);
        if (selected) {
          selected.nativeElement.focus();
        }
      });
  }

  private findSelected(selectedHit: Hit): ElementRef {
    if (this.hitList) {
      const selectedList = this.hitList.filter(
        (item: ElementRef, index: number) => index === selectedHit.id
      );
      return selectedList.length > 0 ? selectedList[0] : null;
    } else {
      return null;
    }
  }
}

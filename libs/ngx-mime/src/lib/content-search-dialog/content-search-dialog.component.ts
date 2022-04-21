import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { ContentSearchNavigationService } from '../core/navigation/content-search-navigation-service/content-search-navigation.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../core/intl';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { Dimensions } from './../core/models/dimensions';
import { Hit } from './../core/models/hit';
import { Manifest } from './../core/models/manifest';
import { SearchResult } from './../core/models/search-result';

@Component({
  selector: 'mime-search',
  templateUrl: './content-search-dialog.component.html',
  styleUrls: ['./content-search-dialog.component.scss'],
})
export class ContentSearchDialogComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public q = '';
  public hits: Hit[] = [];
  public currentHit: Hit | null = null;
  public currentSearch: string | null = null;
  public numberOfHits = 0;
  public isSearching = false;
  public tabHeight = {};
  private manifest: Manifest | null = null;
  private mimeHeight = 0;
  private subscriptions = new Subscription();
  @ViewChild('contentSearchResult', { static: true })
  resultContainer!: ElementRef;
  @ViewChild('query', { static: true }) qEl!: ElementRef;
  @ViewChildren('hitButton', { read: ElementRef })
  hitList!: QueryList<ElementRef>;

  constructor(
    public dialogRef: MatDialogRef<ContentSearchDialogComponent>,
    public intl: MimeViewerIntl,
    public mediaObserver: MediaObserver,
    private mimeResizeService: MimeResizeService,
    private iiifManifestService: IiifManifestService,
    private iiifContentSearchService: IiifContentSearchService,
    private contentSearchNavigationService: ContentSearchNavigationService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.mimeResizeService.onResize.subscribe((dimensions: Dimensions) => {
        this.mimeHeight = dimensions.height;
        this.resizeTabHeight();
      })
    );

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.manifest = manifest;
        }
      )
    );

    this.subscriptions.add(
      this.iiifContentSearchService.onChange.subscribe((sr: SearchResult) => {
        this.hits = sr.hits;
        this.currentSearch = sr.q ? sr.q : '';
        this.q = sr.q;
        this.numberOfHits = sr.size();
        if (this.resultContainer !== null && this.numberOfHits > 0) {
          this.resultContainer.nativeElement.focus();
        } else if (this.q.length === 0 || this.numberOfHits === 0) {
          this.qEl.nativeElement.focus();
        }
      })
    );

    this.subscriptions.add(
      this.iiifContentSearchService.isSearching.subscribe((s: boolean) => {
        this.isSearching = s;
      })
    );

    this.subscriptions.add(
      this.iiifContentSearchService.onSelected.subscribe((hit: Hit | null) => {
        if (hit === null) {
          this.currentHit = hit;
        } else {
          if (!this.currentHit || this.currentHit.id !== hit.id) {
            this.currentHit = hit;
            this.scrollCurrentHitIntoView();
          }
        }
      })
    );

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
    this.contentSearchNavigationService.selected(hit);
    if (this.mediaObserver.isActive('lt-md')) {
      this.dialogRef.close();
    }
  }

  private search() {
    this.currentSearch = this.q;
    if (this.manifest) {
      this.iiifContentSearchService.search(this.manifest, this.q);
    }
  }

  private resizeTabHeight(): void {
    let height = this.mimeHeight;

    if (this.mediaObserver.isActive('lt-md')) {
      this.tabHeight = {
        maxHeight: window.innerHeight - 128 + 'px',
      };
    } else {
      height -= 272;
      this.tabHeight = {
        maxHeight: height + 'px',
      };
    }
  }

  private scrollCurrentHitIntoView() {
    this.iiifContentSearchService.onSelected
      .pipe(take(1))
      .subscribe((hit: Hit | null) => {
        if (hit !== null) {
          const selected = this.findSelected(hit);
          if (selected) {
            selected.nativeElement.focus();
          }
        }
      });
  }

  private findSelected(selectedHit: Hit): ElementRef | null {
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

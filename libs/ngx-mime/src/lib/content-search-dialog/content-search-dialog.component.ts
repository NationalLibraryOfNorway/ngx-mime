import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import {
  MatDialogRef,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ContentSearchNavigationService } from '../core/navigation/content-search-navigation-service/content-search-navigation.service';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from './../core/intl';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { Dimensions } from './../core/models/dimensions';
import { Hit } from './../core/models/hit';
import { Manifest } from './../core/models/manifest';
import { SearchResult } from './../core/models/search-result';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import {
  MatFormField,
  MatPrefix,
  MatInput,
  MatSuffix,
} from '@angular/material/input';
import { NgStyle } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'mime-search',
  templateUrl: './content-search-dialog.component.html',
  styleUrls: ['./content-search-dialog.component.scss'],
  imports: [
    MatToolbar,
    MatIconButton,
    MatTooltip,
    MatDialogClose,
    MatIcon,
    MatDialogTitle,
    CdkScrollable,
    MatDialogContent,
    FormsModule,
    MatFormField,
    MatPrefix,
    MatInput,
    MatSuffix,
    NgStyle,
    MatCard,
    MatCardContent,
    MatProgressBar,
  ],
})
export class ContentSearchDialogComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  dialogRef = inject<MatDialogRef<ContentSearchDialogComponent>>(MatDialogRef);
  intl = inject(MimeViewerIntl);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly mimeResizeService = inject(MimeResizeService);
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly iiifContentSearchService = inject(IiifContentSearchService);
  private readonly contentSearchNavigationService = inject(
    ContentSearchNavigationService,
  );

  public q = '';
  public hits: Hit[] = [];
  public currentHit: Hit | null = null;
  public currentSearch: string | null = null;
  public numberOfHits = 0;
  public isSearching = false;
  public tabHeight = { maxHeight: '100px' };
  isHandsetOrTabletInPortrait = false;
  private manifest: Manifest | null = null;
  private mimeHeight = 0;
  private readonly subscriptions = new Subscription();
  @ViewChild('contentSearchResult', { static: true })
  resultContainer!: ElementRef;
  @ViewChild('query', { static: true }) qEl!: ElementRef;
  @ViewChildren('hitButton', { read: ElementRef })
  hitList!: QueryList<ElementRef>;

  ngOnInit() {
    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
        .subscribe(
          (value: BreakpointState) =>
            (this.isHandsetOrTabletInPortrait = value.matches),
        ),
    );

    this.subscriptions.add(
      this.mimeResizeService.onResize.subscribe((dimensions: Dimensions) => {
        this.mimeHeight = dimensions.height;
        this.resizeTabHeight();
      }),
    );

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.manifest = manifest;
        },
      ),
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
      }),
    );

    this.subscriptions.add(
      this.iiifContentSearchService.isSearching.subscribe((s: boolean) => {
        this.isSearching = s;
      }),
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
      }),
    );

    this.resizeTabHeight();
  }

  ngAfterViewInit() {
    this.scrollCurrentHitIntoView();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
    if (this.isHandsetOrTabletInPortrait) {
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

    if (this.isHandsetOrTabletInPortrait) {
      this.tabHeight = {
        maxHeight: window.innerHeight - 128 + 'px',
      };
    } else {
      height -= 320;
      this.tabHeight = {
        maxHeight: height + 'px',
      };
    }
    this.cdr.detectChanges();
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
        (item: ElementRef, index: number) => index === selectedHit.id,
      );
      return selectedList.length > 0 ? selectedList[0] : null;
    } else {
      return null;
    }
  }
}

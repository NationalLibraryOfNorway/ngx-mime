import { NgStyle } from '@angular/common';
import {
  afterRenderEffect,
  Component,
  computed,
  ElementRef,
  inject,
  linkedSignal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import {
  MatFormField,
  MatInput,
  MatPrefix,
  MatSuffix,
} from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { IiifContentSearchService } from '../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { Hit } from '../core/models/hit';
import { ContentSearchNavigationService } from '../core/navigation/content-search-navigation-service/content-search-navigation.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';

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
    MatDialogContent,
    FormField,
    FormRoot,
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
export class ContentSearchDialogComponent {
  readonly dialogRef =
    inject<MatDialogRef<ContentSearchDialogComponent>>(MatDialogRef);
  private readonly viewerLayoutService = inject(ViewerLayoutService);
  private readonly mimeResizeService = inject(MimeResizeService);
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly iiifContentSearchService = inject(IiifContentSearchService);
  private readonly contentSearchNavigationService = inject(
    ContentSearchNavigationService,
  );
  readonly intl = inject(MimeViewerIntl).value;

  readonly resultContainer = viewChild.required<ElementRef<HTMLElement>>(
    'contentSearchResult',
  );
  readonly qEl = viewChild.required<ElementRef<HTMLInputElement>>('query');
  readonly hitList = viewChildren('hitButton', {
    read: ElementRef,
  });
  readonly isHandsetOrTabletInPortrait =
    this.viewerLayoutService.isHandsetOrTabletInPortrait;
  readonly mimeHeight = computed(
    () => this.mimeResizeService.dimensions()?.height ?? 0,
  );
  readonly manifest = this.iiifManifestService.manifest;
  readonly searchResult = this.iiifContentSearchService.searchResult;
  readonly searchModel = linkedSignal(() => this.searchResult().q);
  readonly searchForm = form(this.searchModel, {
    submission: {
      action: async () => this.search(),
    },
  });
  readonly hits = computed(() => this.searchResult().hits);
  readonly currentSearch = linkedSignal(() => this.searchResult().q);
  readonly numberOfHits = computed(() => this.searchResult().size());
  readonly searching = this.iiifContentSearchService.searching;
  readonly selectedHit = this.iiifContentSearchService.selectedHit;
  readonly tabHeight = computed(() => this.getTabHeight());

  constructor() {
    afterRenderEffect(() => {
      const hasResults = this.searchResult().size() > 0;
      const resultContainer = this.resultContainer();
      const searchInput = this.qEl();

      this.focusSearchInputOrResults(hasResults, resultContainer, searchInput);
    });
    afterRenderEffect(() => {
      const selectedHit = this.selectedHit();
      const hitList = this.hitList();

      this.focusCurrentHit(selectedHit, hitList);
    });
  }

  clear(): void {
    this.searchModel.set('');
    this.search();
  }

  goToHit(hit: Hit): void {
    this.contentSearchNavigationService.selected(hit);
    if (this.isHandsetOrTabletInPortrait()) {
      this.dialogRef.close();
    }
  }

  private search(): void {
    const query = this.searchModel();
    const manifest = this.manifest();
    this.currentSearch.set(query);
    if (manifest) {
      this.iiifContentSearchService.search(manifest, query);
    }
  }

  private focusSearchInputOrResults(
    hasResults: boolean,
    resultContainer: ElementRef<HTMLElement>,
    searchInput: ElementRef<HTMLInputElement>,
  ): void {
    if (hasResults) {
      resultContainer.nativeElement.focus();
    } else {
      searchInput.nativeElement.focus();
    }
  }

  private focusCurrentHit(
    selectedHit: Hit | null,
    hitList: readonly ElementRef[],
  ): void {
    if (selectedHit !== null) {
      hitList[selectedHit.id]?.nativeElement.focus();
    }
  }

  private getTabHeight(): { maxHeight: string } {
    const height = this.isHandsetOrTabletInPortrait()
      ? window.innerHeight - 128
      : this.mimeHeight() - 320;

    return { maxHeight: `${height}px` };
  }
}

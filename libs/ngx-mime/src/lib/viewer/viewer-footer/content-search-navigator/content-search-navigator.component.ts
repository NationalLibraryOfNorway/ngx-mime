import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { map } from 'rxjs';
import { CanvasService } from '../../../core/canvas-service/canvas-service';
import { IiifContentSearchService } from '../../../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../../core/intl/viewer-intl';
import { SearchResult } from '../../../core/models/search-result';
import { ViewingDirection } from '../../../core/models/viewing-direction';
import { ContentSearchNavigationService } from '../../../core/navigation/content-search-navigation-service/content-search-navigation.service';

@Component({
  selector: 'mime-content-search-navigator',
  templateUrl: './content-search-navigator.component.html',
  styleUrls: ['./content-search-navigator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatToolbar, MatIconButton, MatTooltip, MatIcon, NgClass],
})
export class ContentSearchNavigatorComponent {
  private readonly contentSearchNavigationService = inject(
    ContentSearchNavigationService,
  );
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly canvasService = inject(CanvasService);
  private readonly iiifContentSearchService = inject(IiifContentSearchService);
  private readonly destroyRef = inject(DestroyRef);
  readonly intl = inject(MimeViewerIntl).value;

  readonly searchResult = input.required<SearchResult>();
  readonly currentHit = this.contentSearchNavigationService.currentHitCounter;
  readonly isFirstHit = computed(() => this.currentHit() <= 0);
  readonly isLastHit = computed(
    () => this.currentHit() === this.searchResult().size() - 1,
  );
  readonly invert = computed(() => this.shouldInvert());
  readonly isHitOnActiveCanvasGroup = toSignal(
    this.canvasService.onCanvasGroupIndexChange.pipe(
      map((canvasGroupIndex) => {
        this.contentSearchNavigationService.update(canvasGroupIndex);

        return this.contentSearchNavigationService.getHitOnActiveCanvasGroup();
      }),
    ),
    { initialValue: false },
  );

  constructor() {
    this.contentSearchNavigationService.initialize();
    this.destroyRef.onDestroy(() =>
      this.contentSearchNavigationService.destroy(),
    );
  }

  clear(): void {
    this.iiifContentSearchService.destroy();
  }

  goToNextHit(): void {
    this.contentSearchNavigationService.goToNextHit();
  }

  goToPreviousHit(): void {
    this.contentSearchNavigationService.goToPreviousHit();
  }

  private shouldInvert(): boolean {
    const viewingDirection =
      this.iiifManifestService.manifest()?.viewingDirection;

    return (
      viewingDirection !== undefined &&
      viewingDirection !== ViewingDirection.LTR
    );
  }
}

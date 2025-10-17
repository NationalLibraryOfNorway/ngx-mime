import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CanvasService } from '../../../core/canvas-service/canvas-service';
import { IiifContentSearchService } from '../../../core/iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../../../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../../../core/intl';
import { Manifest } from '../../../core/models/manifest';
import { SearchResult } from '../../../core/models/search-result';
import { ViewingDirection } from '../../../core/models/viewing-direction';
import { ContentSearchNavigationService } from '../../../core/navigation/content-search-navigation-service/content-search-navigation.service';

@Component({
  selector: 'mime-content-search-navigator',
  templateUrl: './content-search-navigator.component.html',
  styleUrls: ['./content-search-navigator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ContentSearchNavigatorComponent
  implements OnInit, OnDestroy, OnChanges
{
  intl = inject(MimeViewerIntl);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private canvasService = inject(CanvasService);
  private iiifContentSearchService = inject(IiifContentSearchService);
  private contentSearchNavigationService = inject(
    ContentSearchNavigationService,
  );
  private iiifManifestService = inject(IiifManifestService);

  @Input() searchResult!: SearchResult;
  isHitOnActiveCanvasGroup = false;
  isFirstHit = false;
  isLastHit = false;
  currentHit = 0;
  invert = false;
  private subscriptions = new Subscription();

  ngOnInit() {
    this.contentSearchNavigationService.initialize();
    this.subscriptions.add(
      this.contentSearchNavigationService.currentHitCounter.subscribe((n) => {
        this.currentHit = n;
        this.updateHitStatus();
        this.changeDetectorRef.detectChanges();
      }),
    );
    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          if (manifest) {
            this.invert = manifest.viewingDirection !== ViewingDirection.LTR;
            this.changeDetectorRef.detectChanges();
          }
        },
      ),
    );

    this.subscriptions.add(
      this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()),
    );

    this.subscriptions.add(
      this.canvasService.onCanvasGroupIndexChange.subscribe(
        (canvasGroupIndex) => {
          this.contentSearchNavigationService.update(canvasGroupIndex);
          this.isHitOnActiveCanvasGroup =
            this.contentSearchNavigationService.getHitOnActiveCanvasGroup();
          this.changeDetectorRef.detectChanges();
        },
      ),
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateHitStatus();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.contentSearchNavigationService.destroy();
  }

  clear(): void {
    this.iiifContentSearchService.destroy();
  }

  goToNextHit() {
    this.contentSearchNavigationService.goToNextHit();
  }

  goToPreviousHit() {
    this.contentSearchNavigationService.goToPreviousHit();
  }

  private updateHitStatus() {
    this.isFirstHit = this.currentHit <= 0;
    this.isLastHit = this.currentHit === this.searchResult.size() - 1;
  }
}

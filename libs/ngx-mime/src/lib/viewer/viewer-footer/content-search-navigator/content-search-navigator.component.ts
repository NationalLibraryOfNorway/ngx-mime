import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
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
})
export class ContentSearchNavigatorComponent implements OnInit, OnDestroy {
  @Input() searchResult!: SearchResult;
  public isHitOnActiveCanvasGroup = false;
  public isFirstCanvasGroupHit = false;
  public isLastCanvasGroupHit = false;
  public currentIndex = 0;
  invert = false;
  private subscriptions = new Subscription();

  constructor(
    public intl: MimeViewerIntl,
    private changeDetectorRef: ChangeDetectorRef,
    private canvasService: CanvasService,
    private iiifContentSearchService: IiifContentSearchService,
    private contentSearchNavigationService: ContentSearchNavigationService,
    private iiifManifestService: IiifManifestService
  ) {}

  ngOnInit() {
    this.contentSearchNavigationService.initialize();
    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          if (manifest) {
            this.invert = manifest.viewingDirection === ViewingDirection.LTR;
            this.changeDetectorRef.detectChanges();
          }
        }
      )
    );

    this.subscriptions.add(
      this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck())
    );

    this.subscriptions.add(
      this.canvasService.onCanvasGroupIndexChange.subscribe(
        (canvasGroupIndex) => {
          this.contentSearchNavigationService.update(canvasGroupIndex);
          this.currentIndex = this.contentSearchNavigationService.getCurrentIndex();
          this.isHitOnActiveCanvasGroup = this.contentSearchNavigationService.getHitOnActiveCanvasGroup();
          this.isFirstCanvasGroupHit = this.contentSearchNavigationService.getFirstHitCanvasGroup();
          this.isLastCanvasGroupHit = this.contentSearchNavigationService.getLastHitCanvasGroup();
          this.changeDetectorRef.detectChanges();
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.contentSearchNavigationService.destroy();
  }

  clear(): void {
    this.iiifContentSearchService.destroy();
  }

  goToPreviousCanvasGroupHit() {
    this.contentSearchNavigationService.goToPreviousCanvasGroupHit();
  }

  goToNextCanvasGroupHit() {
    this.contentSearchNavigationService.goToNextCanvasGroupHit();
  }
}

import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentSearchDialogService } from '../../content-search-dialog/content-search-dialog.service';
import { ContentsDialogService } from '../../contents-dialog/contents-dialog.service';
import { AltoService } from '../alto-service/alto.service';
import { CanvasService } from '../canvas-service/canvas-service';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeDomHelper } from '../mime-dom-helper';
import { ModeService } from '../mode-service/mode.service';
import { AccessKeys } from '../models/AccessKeys';
import { Manifest } from '../models/manifest';
import { SearchResult } from '../models/search-result';
import { ViewerMode } from '../models/viewer-mode';
import { ViewingDirection } from '../models/viewing-direction';
import { ContentSearchNavigationService } from '../navigation/content-search-navigation-service/content-search-navigation.service';
import { ViewerService } from '../viewer-service/viewer.service';

@Injectable()
export class AccessKeysService {
  private isSearchable = false;
  private hasHits = false;
  private disabledKeys: number[] = [];
  private subscriptions = new Subscription();
  private invert = false;

  constructor(
    private viewerService: ViewerService,
    private canvasService: CanvasService,
    private modeService: ModeService,
    private iiifManifestService: IiifManifestService,
    private iiifContentSearchService: IiifContentSearchService,
    private contentSearchDialogService: ContentSearchDialogService,
    private contentsDialogService: ContentsDialogService,
    private mimeDomHelper: MimeDomHelper,
    private contentSearchNavigationService: ContentSearchNavigationService,
    private altoService: AltoService
  ) {}

  initialize() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          if (manifest) {
            this.isSearchable = this.isManifestSearchable(manifest);
            this.invert = manifest.viewingDirection === ViewingDirection.RTL;
          }
        }
      )
    );

    this.subscriptions.add(
      this.iiifContentSearchService.onChange.subscribe(
        (result: SearchResult) => {
          this.hasHits = result.hits.length > 0;
        }
      )
    );
  }

  destroy(): void {
    this.unsubscribe();
  }

  public handleKeyEvents(event: KeyboardEvent) {
    const accessKeys = new AccessKeys(event);
    if (!this.isKeyDisabled(event.keyCode)) {
      if (accessKeys.isArrowLeftKeys()) {
        if (!this.isZoomedIn()) {
          this.invert
            ? accessKeys.execute(() => this.goToNextCanvasGroup())
            : accessKeys.execute(() => this.goToPreviousCanvasGroup());
        }
      } else if (accessKeys.isArrowRightKeys()) {
        if (!this.isZoomedIn()) {
          this.invert
            ? accessKeys.execute(() => this.goToPreviousCanvasGroup())
            : accessKeys.execute(() => this.goToNextCanvasGroup());
        }
      } else if (accessKeys.isFirstCanvasGroupKeys()) {
        accessKeys.execute(() => this.goToFirstCanvasGroup());
      } else if (accessKeys.isLastCanvasGroupKeys()) {
        accessKeys.execute(() => this.goToLastCanvasGroup());
      } else if (accessKeys.isNextHitKeys() && this.hasHits) {
        accessKeys.execute(() => this.goToNextHit());
      } else if (accessKeys.isPreviousHitKeys() && this.hasHits) {
        accessKeys.execute(() => this.goToPreviousHit());
      } else if (accessKeys.isFullscreenKeys()) {
        accessKeys.execute(() => this.toggleFullscreen());
      } else if (accessKeys.isSearchDialogKeys() && this.isSearchable) {
        accessKeys.execute(() => {
          this.toggleSearchDialog();
        });
      } else if (accessKeys.isContentsDialogKeys()) {
        accessKeys.execute(() => this.toggleContentsDialog());
      } else if (accessKeys.isResetSearchKeys()) {
        accessKeys.execute(() => this.resetSearch());
      } else if (accessKeys.isPageDownKeys()) {
        accessKeys.execute(() => this.goToNextCanvasGroup());
      } else if (accessKeys.isPageUpKeys()) {
        accessKeys.execute(() => this.goToPreviousCanvasGroup());
      } else if (accessKeys.isZoomInKeys()) {
        accessKeys.execute(() => this.zoomIn());
      } else if (accessKeys.isZoomOutKeys()) {
        accessKeys.execute(() => this.zoomOut());
      } else if (accessKeys.isZoomHomeKeys()) {
        accessKeys.execute(() => this.zoomHome());
      } else if (accessKeys.isRotateKeys()) {
        accessKeys.execute(() => this.rotateClockWise());
      } else if (accessKeys.isRecognizedTextContentKeys()) {
        accessKeys.execute(() => this.toggleRecognizedTextContent());
      }
    }
  }

  private goToNextCanvasGroup() {
    this.viewerService.goToNextCanvasGroup();
  }

  private goToPreviousCanvasGroup() {
    this.viewerService.goToPreviousCanvasGroup();
  }

  private goToFirstCanvasGroup() {
    this.viewerService.goToCanvasGroup(0, false);
  }

  private goToLastCanvasGroup() {
    this.viewerService.goToCanvasGroup(
      this.canvasService.numberOfCanvasGroups - 1,
      false
    );
  }

  private rotateClockWise() {
    this.viewerService.rotate();
    this.mimeDomHelper.setFocusOnViewer();
  }

  private toggleRecognizedTextContent() {
    this.altoService.toggle();
  }

  private goToNextHit() {
    this.contentSearchNavigationService.goToNextHit();
  }

  private goToPreviousHit() {
    this.contentSearchNavigationService.goToPreviousHit();
  }

  private zoomIn() {
    if (this.modeService.mode === ViewerMode.DASHBOARD) {
      this.modeService.toggleMode();
    } else {
      this.viewerService.zoomIn();
    }
  }

  private zoomOut() {
    if (this.modeService.mode === ViewerMode.PAGE) {
      this.modeService.toggleMode();
    } else if (this.modeService.isPageZoomed()) {
      this.viewerService.zoomOut();
    }
  }

  private zoomHome() {
    if (this.modeService.isPageZoomed()) {
      this.viewerService.home();
    }
  }

  private toggleSearchDialog() {
    if (
      this.modeService.mode === ViewerMode.PAGE ||
      this.modeService.isPageZoomed()
    ) {
      this.modeService.mode = ViewerMode.DASHBOARD;
      this.contentSearchDialogService.open();
    } else {
      if (this.contentSearchDialogService.isOpen()) {
        this.contentSearchDialogService.close();
      } else {
        this.contentSearchDialogService.open();
      }
    }

    this.contentsDialogService.close();
  }

  private toggleContentsDialog() {
    if (
      this.modeService.mode === ViewerMode.PAGE ||
      this.modeService.isPageZoomed()
    ) {
      this.modeService.mode = ViewerMode.DASHBOARD;
      this.contentsDialogService.open();
    } else {
      if (this.contentsDialogService.isOpen()) {
        this.contentsDialogService.close();
      } else {
        this.contentsDialogService.open();
      }
    }
    this.contentSearchDialogService.close();
  }

  private toggleFullscreen() {
    this.mimeDomHelper.toggleFullscreen();
    this.mimeDomHelper.setFocusOnViewer();
  }

  private resetSearch() {
    this.iiifContentSearchService.destroy();
  }

  private isManifestSearchable(manifest: Manifest): boolean {
    return manifest.service ? true : false;
  }

  private isZoomedIn(): boolean {
    return this.modeService.isPageZoomed();
  }

  private updateDisabledKeys() {
    this.resetDisabledKeys();
    if (this.contentsDialogService.isOpen()) {
      this.disableKeysForContentDialog();
    } else if (this.contentSearchDialogService.isOpen()) {
      this.diableKeysForContentSearchDialog();
    }
  }

  private disableKeysForContentDialog() {
    this.disabledKeys = this.disabledKeys
      .concat(AccessKeys.ARROWLEFT)
      .concat(AccessKeys.ARROWRIGHT);
  }

  private diableKeysForContentSearchDialog() {
    this.disabledKeys = this.disabledKeys
      .concat(AccessKeys.ARROWLEFT)
      .concat(AccessKeys.ARROWRIGHT)
      .concat(AccessKeys.firstCanvasGroupCodes)
      .concat(AccessKeys.lastCanvasGroupCodes)
      .concat(AccessKeys.zoomInCodes)
      .concat(AccessKeys.zoomOutCodes)
      .concat(AccessKeys.zoomHomeCodes)
      .concat(AccessKeys.nextHit)
      .concat(AccessKeys.previousHit)
      .concat(AccessKeys.toggleSearchDialogCodes)
      .concat(AccessKeys.toggleContentsDialogCodes)
      .concat(AccessKeys.toggleFullscreenCodes);
  }

  private resetDisabledKeys() {
    this.disabledKeys = [];
  }

  private isKeyDisabled(keyCode: number): boolean {
    this.updateDisabledKeys();
    return this.disabledKeys.indexOf(keyCode) > -1;
  }

  unsubscribe(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}

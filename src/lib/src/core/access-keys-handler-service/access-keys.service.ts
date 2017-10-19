import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ViewerService } from '../viewer-service/viewer.service';
import { PageService } from '../page-service/page-service';
import { ContentSearchDialogService } from '../../content-search-dialog/content-search-dialog.service';
import { ContentsDialogService } from '../../contents-dialog/contents-dialog.service';
import { ModeService } from '../mode-service/mode.service';
import { ViewerMode } from '../models/viewer-mode';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { Manifest } from '../models/manifest';
import { MimeDomHelper } from '../mime-dom-helper';

@Injectable()
export class AccessKeysService implements OnDestroy {
  private isLetterKeysEnabled = true;
  private isSearchable = false;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private viewerService: ViewerService,
    private pageService: PageService,
    private modeService: ModeService,
    private iiifManifestService: IiifManifestService,
    private contentSearchDialogService: ContentSearchDialogService,
    private contentsDialogService: ContentsDialogService,
    private mimeDomHelper: MimeDomHelper
  ) {
    this.subscriptions.push(
      this.contentSearchDialogService.isContentSearchDialogOpen.subscribe((open: boolean) => {
        this.isLetterKeysEnabled = !open;
      })
    );

    this.subscriptions.push(
      this.iiifManifestService.currentManifest.subscribe((manifest: Manifest) => {
        this.isSearchable = this.isManifestSearchable(manifest);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }

  public handleKeyEvents(event: KeyboardEvent) {
    // console.log(event);
    if (event.key === 'PageDown' || event.key === 'ArrowRight' || (event.key === 'n' && this.isLetterKeysEnabled)) {
      this.goToNextPage();
    } else if (event.key === 'PageUp' || event.key === 'ArrowLeft' || (event.key === 'p' && this.isLetterKeysEnabled)) {
      this.goToPreviousPage();
    } else if (event.key === 'Home') {
      this.goToFirstPage();
    } else if (event.key === 'End') {
      this.goToLastPage();
    } else if (event.key === '+') {
      this.zoomIn();
    } else if (event.key === '-') {
      this.zoomOut();
    } else if (event.key === '0') {
      this.zoomHome();
    } else if (this.isSearchable && event.key === 'F' && event.altKey && event.shiftKey) {
      this.toggleSearch();
    } else if (event.key === 'C' && event.altKey && event.shiftKey) {
      this.toggleContents();
    } else if (event.key === 'f' && this.isLetterKeysEnabled) {
      this.toggleFullscreen();
    }
  }

  private goToNextPage() {
    this.viewerService.goToNextPage();
  }

  private goToPreviousPage() {
    this.viewerService.goToPreviousPage();
  }

  private goToFirstPage() {
    this.viewerService.goToPage(0, false);
  }

  private goToLastPage() {
    this.viewerService.goToPage(this.pageService.numberOfPages - 1, false);
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
    } else if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      this.viewerService.zoomOut();
    }
  }

  private zoomHome() {
    if (this.modeService.mode === ViewerMode.PAGE_ZOOMED) {
      this.viewerService.home();
    }
  }

  private toggleSearch() {
    this.contentsDialogService.close();
    this.contentSearchDialogService.toggle();
  }

  private toggleContents() {
    this.contentSearchDialogService.close();
    this.contentsDialogService.toggle();
  }

  private toggleFullscreen() {
    this.mimeDomHelper.toggleFullscreen();
  }

  private isManifestSearchable(manifest: Manifest): boolean {
    return manifest.service ? true : false;
  }
}
